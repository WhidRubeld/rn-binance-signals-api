import { Router } from 'express'
import { UserController } from '../controllers'
import { JwtMiddleware } from '../middlewares'

const router = Router()

router.get('/me', [JwtMiddleware], UserController.me)
router.post('/password-change', [JwtMiddleware], UserController.changePassword)

export default router
