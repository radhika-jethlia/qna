import mongoose from 'mongoose'

const AdsModel = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        unique: true
    },
    added_on: {
        type: Date,
        required: true,
        default: new Date
    },
    file_name: {
        type: String,
        required: true
    },
    is_active: {
        type: String,
        default: "Active"
    }
})

export default mongoose.model('ads', AdsModel)