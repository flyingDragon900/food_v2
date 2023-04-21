const express = require('express')
const { getUser, loginUser, singupUser } = require('../controllers/userController')

const userRouter = express.Router()

userRouter.get('/', getUser).post('/login', loginUser).post('/signup', singupUser)

module.exports = userRouter