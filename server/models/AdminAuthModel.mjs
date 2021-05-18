import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const AdminAuthSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
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
})

// AdminAuthSchema.methods.comparePassword = (password) => {
//     console.log(AdminAuthSchema.password)
//     return bcrypt.compareSync(password, this.password, 10)
// }

export default mongoose.model('admin_credentials', AdminAuthSchema)