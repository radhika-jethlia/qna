import { Router } from 'express'
import {
    addQuestion,
    updateQuestion,
    getAllQuestions,
    getActiveQuestions,
    getInactiveQuestions,
    getQuestionsBySubject,
    getQuestionById,
    getRandomQuestionsBySubject,
    getRandomQuestions
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
router.get('/get_questions_by_subject/:subjectId', getQuestionsBySubject)
router.get('/get_question_by_id/:questionId', getQuestionById)
router.get('/get_random_questions_by_subject/:subjectId', getRandomQuestionsBySubject)
router.get('/get_random_questions', getRandomQuestions)

export default router