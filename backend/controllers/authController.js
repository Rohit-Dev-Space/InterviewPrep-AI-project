const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const assignJWT = async (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_PASS, { expiresIn: "7d" })
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImgUrl } = req.body

        const userExists = await User.findOne({ email: email })

        if (userExists) {
            return res.status(200).json({ message: 'User already exists' })
        }

        if (!email || !name || !password) {
            return res.status(201).json({ message: 'All feilds except profile Image are required' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const register = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImgUrl,
        })

        return res.json({
            message: 'User Registered',
            _id: register._id,
            name: register.name,
            email: register.email,
            profileImgUrl: register.profileImgUrl,
            token: await assignJWT(register._id)
        })

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const userExists = await User.findOne({ email: email })

        if (!userExists) {
            return res.status(200).json({ message: 'User Not Found' })
        }

        if (!email || !password) {
            return res.status(201).json({ message: 'All feilds are required' })
        }

        const matchPass = await bcrypt.compare(password, userExists.password)
        if (matchPass) {
            return res.json({
                message: 'User LogedIn',
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                profileImgUrl: userExists.profileImgUrl,
                token: await assignJWT(userExists._id)
            })
        } else {
            res.json({ message: 'Invalid Password' })
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err })
    }
}
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")

        if (!user) {
            return res.json({ message: 'User does not exist' })
        }

        res.json(user)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err })
    }
}

module.exports = { registerUser, loginUser, getUserProfile }