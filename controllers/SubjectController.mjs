import SubjectsSchema from '../models/SubjectsModel.mjs'
import fs from 'fs'
import { SUBJECT_UPLOAD_PATH, __dirname } from '../Paths.mjs'

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
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            message: 'No files selected to upload.'
        });
    }
    let file_name = SUBJECT_UPLOAD_PATH + req.files.subject_file.name
    req.files.subject_file.mv(__dirname + SUBJECT_UPLOAD_PATH + req.files.subject_file.name, (err) => {
        if (err) {
            return res.status(500).json({
                message: 'Error uploading file',
                err
            })
        }
    })
    new SubjectsSchema({
        ...req.body,
        file_name
    })
        .save()
        .then((subject) => {
            return res.status(201).json({
                message: 'Subject added successfully',
                subject
            })
        })
        .catch(err => {
            fs.unlinkSync(__dirname + file_name)
            return res.status(500).json({
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