require('dotenv').config()
const express = require('express')

const mongoDbConnection = require('./db/mongodb')
mongoDbConnection()

const app = express()
const PORT = process.env.PORT

// Middleware to listen post request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = require('./routes/route')
const userRouter = require('./routes/userRoute')

app.use('/api/food', router)
app.use('/api/user', userRouter)

app.listen(PORT, () => console.log(`server is listening on port ${`http://localhost:${PORT}`}`))