import {Router} from 'express'
import {
    GetSubjects,
    AddSubject,
    UpdateSubject
} from '../controllers/SubjectController.mjs'

const router = Router()

router.get('/get_subjects', GetSubjects)
router.post('/add_subject', AddSubject)
router.post('/update_subject/:subjectId', UpdateSubject)

export default router

