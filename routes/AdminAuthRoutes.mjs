import { Router } from 'express'
import { AdminLogin, AdminSignUp, changePasswordAdmin } from '../controllers/AdminAuthController.mjs'
import { adminLoginRequired, adminProfile } from '../middlewares/AuthenticationMiddleware.mjs'

const router = Router()
router.post('/login', AdminLogin)
router.post('/signup', AdminSignUp)
router.post('/update/password', adminLoginRequired, adminProfile, changePasswordAdmin)

export default router