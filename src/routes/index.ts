import { Router, Request, Response } from 'express'
import AuthRouter from './auth.router'
import UserRouter from './user.router'

const routes = Router()

routes.use('/auth', AuthRouter)
routes.use('/user', UserRouter)

export default routes
