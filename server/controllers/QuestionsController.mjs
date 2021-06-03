import QuestionsModel from '../models/QuestionsModel.mjs'
import { QUESTIONS_PER_GAME } from '../config/configs.mjs'
import SubjectsSchema from '../models/SubjectsModel.mjs'

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
            res.status(200)
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
                questions,
                // subject: await SubjectsSchema.findById(questions.subject)
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: 'Something went wrong',
                err
            })
    }
}

export const getActiveQuestions = async (req, res, next) => {
    try {
        const questions = await QuestionsModel.find({
            is_active: "Active"
        })
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

export const getInactiveQuestions = async (req, res, next) => {
    try {
        const questions = await QuestionsModel.find({
            is_active: "Inactive"
        })
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

export const getQuestionById = async (req, res, next) => {
    if (!req.params.questionId) return res.status(400).json({
        message: "Question id not provided"
    })
    const questionId = req.params.questionId
    await QuestionsModel.findById({
        _id: questionId
    }, async (err, question) => {
        if (err)
            return res.status(500)
                .json({
                    message: 'An error occured while finding this question',
                    err
                })
        if (!question)
            return res.status(404)
                .json({
                    message: 'Question not found'
                })
        return res.status(200)
            .json({
                question
            })
    })
}

export const getQuestionsBySubject = async (req, res, next) => {
    const subjectId = req.params.subjectId
    try {
        const questions = await QuestionsModel.find({
            subject: subjectId
        })
        return res.status(200)
            .json({
                questions
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: 'An error occured while finding questions',
                err
            })
    }
}

export const getRandomQuestionsBySubject = async (req, res, next) => {
    const subjectId = req.params.subjectId
    try {
        const questions = await QuestionsModel.find({
            subject: subjectId
        }).limit(QUESTIONS_PER_GAME)
        return res.status(200)
            .json({
                questions: await shuffle(questions)
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: 'An error occured while finding questions',
                err
            })
    }
}

export const getRandomQuestions = async (req, res, next) => {
    try {
        const questions = await QuestionsModel.find().limit(QUESTIONS_PER_GAME)
        return res.status(200)
            .json({
                questions: await shuffle(questions)
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: 'An error occured while finding questions',
                err
            })
    }
}

const shuffle = async (v) => {
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
}