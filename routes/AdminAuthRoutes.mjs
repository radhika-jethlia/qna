import { Router } from 'express'
import { AdminLogin, AdminSignUp } from '../controllers/AdminAuthController.mjs'

const router = Router()
router.post('/login', AdminLogin)
router.post('/signup', AdminSignUp)

export default router