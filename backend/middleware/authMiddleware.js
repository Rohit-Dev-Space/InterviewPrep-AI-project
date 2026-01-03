const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token && token.startsWith('Bearer')) {
            token = token.split(" ")[1]
            decoded = jwt.verify(token, process.env.JWT_PASS)
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } else {
            res.status(401).json({ message: 'Not authorized,No token' })
        }
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed', error: err })
    }
}

module.exports = protect;