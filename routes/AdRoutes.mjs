import { Router } from 'express'
import multer from 'multer'
import { uniqueFileName, ADS_UPLOAD_PATH } from '../Paths.mjs'
import {
    AddNewAd,
    GetAds,
    GetAdsById,
    getActiveAds,
    updateAd
} from '../controllers/AdsController.mjs'
import {
    adminLoginRequired,
    adminProfile
} from '../middlewares/AuthenticationMiddleware.mjs'

const route = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, ADS_UPLOAD_PATH)
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

route.post('/add', upload.single('slider'), adminLoginRequired, adminProfile, AddNewAd)
route.get('/get_ads', GetAds)
route.get('/get_ad_by_id/:adId', GetAdsById)
route.get('/get_active_ads', getActiveAds)
route.post('/update/:adId', upload.single('slider'), adminLoginRequired, adminProfile, updateAd)
// route.post('/ads/add', AddNewAd)

export default route