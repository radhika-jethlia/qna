import {Router} from 'express'
import {
    GetSubjects,
    AddSubject
} from '../controllers/SubjectController.mjs'

const router = Router()

router.get('/get_subjects', GetSubjects)
router.post('/add_subject', AddSubject)

export default router

