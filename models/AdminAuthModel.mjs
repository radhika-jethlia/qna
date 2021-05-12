import mongoose from 'mongoose'

export default mongoose.model('admin_credentials', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    added_on: {
        type: Date,
        required: true
    },
    is_active: {
        type: Boolean, // 1 for active, 0 for inactive
        required: true,
        default: 1
    },
}))