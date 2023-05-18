const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: true,
        validate: [validator.isStrongPassword, 'Please provide a strong password']
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})
const user = mongoose.model('user', userSchema)

module.exports = user