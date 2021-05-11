import mongoose from 'mongoose'

const Subjects = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        unique: true
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

export default mongoose.model('subjects', Subjects)