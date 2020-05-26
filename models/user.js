const mongoose = require('mongoose')
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLoweCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
}, {
    timestamps: true
})

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', userSchema)