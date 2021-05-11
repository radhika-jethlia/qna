import {Router} from 'express'
import {
    GetSubjects,
    AddSubject,
    UpdateSubject,
    GetSubjectById
} from '../controllers/SubjectController.mjs'

const router = Router()

router.get('/all_subjects', GetSubjects)
router.post('/add_subject', AddSubject)
router.post('/update_subject/:subjectId', UpdateSubject)
router.get('/get_subject/:subjectId', GetSubjectById)

export default router

