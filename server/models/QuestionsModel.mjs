import mongoose from 'mongoose'

const Question = new mongoose.Schema({
    question: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    },
    option_a: {
        type: String,
        trim: true,
        required: true
    },
    option_b: {
        type: String,
        trim: true,
        required: true
    },
    option_c: {
        type: String,
        trim: true,
        required: true
    },
    option_d: {
        type: String,
        trim: true,
        required: true
    },
    answer: {
        type: String,
        trim: true,
        required: true
    },
    added_on: {
        type: Date,
        required: true,
        default: new Date
    },
    is_active: {
        type: String,
        default: "Active"
    }
})

export default mongoose.model('questions', Question)