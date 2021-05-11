import mongoose from 'mongoose'

const Subjects = new mongoose.Schema({
    subject_id: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    added_on: {
        type: Date,
        required: true
    }
})

export default mongoose.model('subjects', Subjects)