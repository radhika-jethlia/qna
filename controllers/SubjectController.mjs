import Subjects from '../models/SubjectsModel.mjs'

export const GetSubjects = (req, res, next) => {
    Subjects
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
    let subject = new Subjects({
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