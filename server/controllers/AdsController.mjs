import fs from 'fs'
import AdsSchema from '../models/AdsModel.mjs'

export const GetAds = (req, res, next) => {
    AdsSchema
        .find()
        .then((adsList) => {
            res.status(200)
                .json({
                    adsList
                })
        })
        .catch((error) => {
            res.status(500)
                .json({
                    message: 'Error fetching sliders.',
                    error
                })
        })
}

export const AddNewAd = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'Please select an image'
        })
    }
    let file_name = req.file.destination + '/' + req.file.filename
    new AdsSchema({
        ...req.body,
        file_name
    })
        .save()
        .then((ad) => {
            res.status(201).json({
                message: 'Slider added successfully',
                ad
            })
        })
        .catch(err => {
            fs.unlinkSync(file_name)
            res.status(500).json({
                message: 'Error adding slider',
                err
            })
        })
}

export const GetAdsById = async (req, res, next) => {
    const adId = req.params.adId
    try {
        const result = await AdsSchema.findById(adId)
        if (result) {
            res.status(200).json({
                result
            })
        } else {
            res.status(404).json({
                message: 'Slider not found',
                adId
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occured',
            err
        })
    }
}

export const getActiveAds = async (req, res, next) => {
    const adId = req.params.adId
    try {
        const result = await AdsSchema.find({
            is_active: "Active"
        })
        if (result) {
            res.status(200).json({
                result
            })
        } else {
            res.status(404).json({
                message: 'Sliders not found',
                adId
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occured',
            adId
        })
    }
}

export const updateAd = async (req, res, next) => {
    const adId = req.params.adId
    if (req.file) {
        let file_name = req.file.destination + '/' + req.file.filename
        req.body = {
            ...req.body,
            file_name
        }
    }
    try {
        let adDetails = await AdsSchema.findById(adId)
        if (adDetails._id) {
            const result = await AdsSchema.updateOne(
                { _id: adId },
                {
                    $set: req.body
                }
            )
            req.file && fs.unlinkSync(adDetails.file_name)
            res.status(204).json({
                message: 'Slider updated',
                result
            })
        } else {
            res.status(404).json({
                message: 'Slider not found',
                adId
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occured',
            err
        })
    }
}