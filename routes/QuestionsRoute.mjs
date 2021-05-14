import { Router } from 'express'
import {
    addQuestion,
    updateQuestion,
    getAllQuestions,
    getActiveQuestions,
    getInactiveQuestions,
    getQuestionById
} from '../controllers/QuestionsController.mjs'
import {
    adminLoginRequired,
    adminProfile
} from '../middlewares/AuthenticationMiddleware.mjs'

const router = Router()

router.post('/add', adminLoginRequired, adminProfile, addQuestion)
router.post('/update/:questionId', adminLoginRequired, adminProfile, updateQuestion)
router.get('/get_all', getAllQuestions)
router.get('/active', getActiveQuestions)
router.get('/inactive', getInactiveQuestions)
router.get('/get_question_by_id/:questionId', getQuestionById)

export default router