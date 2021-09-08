import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config'

export const JwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  const parts = req.headers.authorization.split(' ')
  if (parts.length !== 2) {
    res.status(401).send()
    return
  }

  const token = parts[1]
  let jwtPayload

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret)
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send()
    return
  }

  // The token is valid for 30 days
  // We want to send a new token on every request
  // const { userId, username } = jwtPayload
  // const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
  //   expiresIn: '30d'
  // })
  // res.setHeader('token', newToken)

  //Call the next middleware or controller
  next()
}
