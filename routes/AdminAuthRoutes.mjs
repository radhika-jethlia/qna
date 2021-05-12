import { Router } from 'express'
import { AdminLogin } from '../controllers/AdminAuthController.mjs'

const router = Router()
router.post('/login', AdminLogin)

export default router