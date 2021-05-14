import { Router } from 'express'
import { addQuestion, updateQuestion, getAllQuestions } from '../controllers/QuestionsController.mjs'
import { adminLoginRequired, adminProfile } from '../middlewares/AuthenticationMiddleware.mjs'

const router = Router()

router.post('/add', adminLoginRequired, adminProfile, addQuestion)
router.post('/update/:questionId', adminLoginRequired, adminProfile, updateQuestion)
router.get('/get_all', getAllQuestions)

export default router