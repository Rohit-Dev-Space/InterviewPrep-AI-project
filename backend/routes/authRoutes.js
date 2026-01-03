const express = require('express')
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController')
const protect = require('../middleware/authMiddleware');
const { uploads } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getUserProfile)

router.post('/image-upload', uploads.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(201).json({ message: 'No file Uploaded' })
    }
    const imgUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    res.status(200).json({ imgUrl })
})

module.exports = router;