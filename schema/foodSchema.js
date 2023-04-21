const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    imgUrl: String,
    desc: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // User_id required to point the food only to specific user
    user_id: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Foods', foodSchema)