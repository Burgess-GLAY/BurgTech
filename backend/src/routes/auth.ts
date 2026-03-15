import { Router } from 'express'
import { login, register, me } from '../controllers/authController'
import { requireAuth } from '../middleware/auth'
import { authLimiter } from '../middleware/rateLimiter'

export const authRouter = Router()
authRouter.post('/login',    authLimiter, login)
authRouter.post('/register', authLimiter, register)
authRouter.get('/me',        requireAuth, me)
