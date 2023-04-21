const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { getFood, postFood, updateFood, deleteFood } = require('../controllers/controller')
const router = express.Router()

// For protecting Routes for only logined user
router.use(requireAuth)

router.get('/', getFood).post('/', postFood).put('/:id', updateFood).delete('/:id', deleteFood)

module.exports = router