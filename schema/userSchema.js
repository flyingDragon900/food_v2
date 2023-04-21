const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
})

// Signup user with own logic
userSchema.statics.signup = async function (name, email, password) {
    // Checking a valid email and password
    if (!email || !password) {
        throw Error("All fields must be filed")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not valid")
    }
    // checking if user exeists
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('user already exists')
    }

    // creating salt and hash
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash })

    return user
}

// Login user
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All feilds must be filed")
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('user not exist')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('match not exist')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)