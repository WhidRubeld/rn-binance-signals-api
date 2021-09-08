import { Request, Response } from 'express'
import { validate } from 'class-validator'
import { getUserById, responseUser, updateUser } from '../repositories'

export class UserController {
  static me = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId

    const user = await getUserById(id)

    if (!user) {
      res.status(401).send()
      return
    }

    res.status(200).send(responseUser(user))
  }

  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId

    const { oldPassword, newPassword } = req.body
    if (!(oldPassword && newPassword)) {
      res.status(400).send()
    }

    const user = await getUserById(id)
    if (!user) {
      res.status(401).send()
      return
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send()
      return
    }

    user.password = newPassword
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    user.hashPassword()
    updateUser(user)

    res.status(204).send()
  }
}
