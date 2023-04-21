const User = require('../schema/userSchema')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SUPER_SECRET_kEY, { expiresIn: '3d' })
}

const getUser = async (req, res) => {
    const user = await User.find({})
    res.status(200).json(user)
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const singupUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await User.signup(name, email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getUser,
    singupUser,
    loginUser
}