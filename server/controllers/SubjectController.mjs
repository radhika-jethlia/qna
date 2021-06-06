import fs from 'fs'
import SubjectsSchema from '../models/SubjectsModel.mjs'

export const GetSubjects = (req, res, next) => {
    SubjectsSchema
        .find()
        .then((subjectsList) => {
            res.status(200)
                .json({
                    subjectsList
                })
        })
        .catch((error) => {
            res.status(500)
                .json({
                    message: 'Error fetching subjects.',
                    error
                })
        })
}

export const AddSubject = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'Please select an image'
        })
    }
    let file_name = req.file.destination + '/' + req.file.filename
    new SubjectsSchema({
        ...req.body,
        file_name
    })
        .save()
        .then((subject) => {
            res.status(201).json({
                message: 'Subject added successfully',
                subject
            })
        })
        .catch(err => {
            fs.unlinkSync(file_name)
            res.status(500).json({
                message: 'Error adding subject',
                err
            })
        })
}

export const UpdateSubject = async (req, res, next) => {
    const subjectId = req.params.subjectId
    if (req.file) {
        let file_name = req.file.destination + '/' + req.file.filename
        req.body = {
            ...req.body,
            file_name
        }
    }
    try {
        let subjectDetails = await SubjectsSchema.findById(subjectId)
        if (subjectDetails._id) {
            const result = await SubjectsSchema.updateOne(
                { _id: subjectId },
                {
                    $set: req.body
                }
            )
            req.file && fs.unlinkSync(subjectDetails.file_name)
            res.status(204).json({
                message: 'Subject updated',
                result
            })
        } else {
            res.status(404).json({
                message: 'Subject not found',
                subjectId
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occured',
            err
        })
    }
}

export const GetSubjectById = async (req, res, next) => {
    const subjectId = req.params.subjectId
    try {
        const result = await SubjectsSchema.findById(subjectId)
        if (result) {
            res.status(200).json({
                result
            })
        } else {
            res.status(404).json({
                message: 'Subject not found',
                subjectId
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occured',
            subjectId
        })
    }
}

export const ActiveSubjects = async (req, res, next) => {
    try {
        const subjectsList = await SubjectsSchema.find({
            is_active: 'Active'
        })
        if (subjectsList) {
            res.status(200).json({
                subjectsList
            })
        } else {
            res.status(404).json({
                message: 'No active subjects found',
                subjectId
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occured',
            subjectId
        })
    }
}