import QuestionsModel from '../models/QuestionsModel.mjs'

export const addQuestion = async (req, res, next) => {
    await QuestionsModel.find({
        question: req.body.question
    }, async (err, questions) => {
        if (err)
            return res.status(500)
                .json({
                    message: 'Something went wrong',
                    err
                })
        if (questions._id)
            return res.status(409)
                .json({
                    message: 'Question already exists',
                    questions
                })
        try {
            const result = await new QuestionsModel({
                ...req.body
            }).save()
            res.status(201).json({
                message: 'Question added successfully',
                result
            })
        } catch (err) {
            res.status(500).json({
                message: 'Error adding questions',
                err
            })
        }
    })
}

export const updateQuestion = async (req, res, body) => {
    if (!req.params.questionId) return res.status(400).json({
        message: "Question id not provided"
    })
    const questionId = req.params.questionId
    await QuestionsModel.findById({
        _id: questionId
    }, async (err, questions) => {
        if (err)
            return res.status(500)
                .json({
                    message: 'An error occured while finding this question',
                    err
                })
        if (!questions)
            return res.status(404)
                .json({
                    message: 'Question not found'
                })
        try {
            const result = await QuestionsModel.updateOne({
                _id: questionId
            }, {
                $set: req.body
            })
            res.status(500)
                .json({
                    message: 'Question updated successfully',
                    result
                })
        } catch (err) {
            return res.status(500)
                .json({
                    message: 'Something went wrong',
                    err
                })
        }
    })
}

export const getAllQuestions = async (req, res, next) => {
    try {
        const questions = await QuestionsModel.find()
        return res.status(200)
            .json({
                questions
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: 'Something went wrong',
                err
            })
    }
}