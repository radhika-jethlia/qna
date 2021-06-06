import { Router } from 'express'
import multer from 'multer'
import {
    GetSubjects,
    AddSubject,
    UpdateSubject,
    GetSubjectById,
    ActiveSubjects
} from '../controllers/SubjectController.mjs'
import { uniqueFileName, SUBJECT_UPLOAD_PATH } from '../Paths.mjs'
import { adminLoginRequired, adminProfile } from '../middlewares/AuthenticationMiddleware.mjs'

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, SUBJECT_UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + uniqueFileName + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error("Filetype dont match"), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

router.get('/all_subjects', GetSubjects)
router.get('/active_subjects', ActiveSubjects)
router.post('/add_subject', upload.single('subject_file'), adminLoginRequired, adminProfile, AddSubject)
router.post('/update_subject/:subjectId', upload.single('subject_file'), UpdateSubject)
router.get('/get_subject/:subjectId', GetSubjectById)

export default router

