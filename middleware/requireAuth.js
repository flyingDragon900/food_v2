const jwt = require('jsonwebtoken')
const User = require('../schema/userSchema')
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token is required' })
    }
    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SUPER_SECRET_kEY)
        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ error: 'Request is not Authorized' })
    }
}
module.exports = requireAuth