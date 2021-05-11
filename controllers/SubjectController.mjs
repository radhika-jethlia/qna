import SubjectsSchema from '../models/SubjectsModel.mjs'
import fs from 'fs/promises'

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
                    message: 'Error fetching subjects.'
                })
        })
}

export const AddSubject = (req, res, next) => {
    let subject = new SubjectsSchema({
        ...req.body
    })
        .save()
        .then((subject) => {
            res.status(201).json({
                message: 'Subject added successfully',
                subject
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error adding subject',
                err
            })
        })
}

export const UpdateSubject = async (req, res, next) => {
    const subjectId = req.params.subjectId
    try {
        if (await SubjectsSchema.findById(subjectId)) {
            const result = await SubjectsSchema.updateOne(
                { _id: subjectId },
                {
                    $set: req.body
                }
            )
            res.status(201).json({
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