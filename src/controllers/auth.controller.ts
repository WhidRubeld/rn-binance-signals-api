import { validate } from 'class-validator'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { User } from '../entity'
import { createUser, getUserByUsername } from '../repositories'

export class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body
    if (!(username && password)) {
      res.status(400).send()
    }

    //Get user from database
    const user = await getUserByUsername(username)
    if (!user) {
      res.status(401).send()
      return
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send()
      return
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.send({ access_token: token })
  }

  static register = async (req: Request, res: Response) => {
    let { username, password } = req.body
    let user = new User()
    user.username = username
    user.password = password

    //Validade if the parameters are ok
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    //Hash the password, to securely store on DB
    user.hashPassword()

    //Try to save. If fails, the username is already in use
    const response = await createUser(user)
    if (!response) {
      res.status(409).send('username already in use')
      return
    }
    //If all ok, send 201 response
    res.status(201).send({ status: true })
  }
}
