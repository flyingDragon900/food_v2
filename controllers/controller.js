const Foods = require('../schema/foodSchema')

const getFood = async (req, res) => {
    // User_id required to point the food only to specific user
    const user_id = req.user._id
    const foods = await Foods.find({ user_id })
    res.status(201).send(foods)
}

const postFood = async (req, res) => {
    const { foodName, imgUrl, desc, price, address } = req.body
    // For error handling -----> we push in the array the fields which are empty 
    let emptyFiels = []
    if (!foodName) {
        emptyFiels.push('foodName')
    }
    if (!price) {
        emptyFiels.push('price')
    }
    if (!address) {
        emptyFiels.push('address')
    }

    if (emptyFiels.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the feilds', emptyFiels })
    }

    try {
        const user_id = req.user._id
        const food = await Foods.create({ foodName, imgUrl, desc, price, address, user_id })
        res.status(200).json(food)
    } catch (error) {
        res.status(400).json({ msg: "bad request" })
    }
}

// We hadn't made this fumction
const updateFood = async (req, res) => {
    try {
        await Foods.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ message: `Item with id ${req.params.id} is updated successfull` })
    } catch (error) {
        res.status(400).json({ msg: "bad request" })
    }
}

const deleteFood = async (req, res) => {
    try {
        await Foods.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: `Item with id ${req.params.id} is deleted successfull` })
    } catch (error) {
        res.status(400).json({ msg: "bad request" })
    }
}

module.exports = { getFood, postFood, updateFood, deleteFood }

