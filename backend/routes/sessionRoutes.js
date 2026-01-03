const express = require('express')
const protect = require('../middleware/authMiddleware')
const { createSession, getSessionById, getMySession, deleteSession } = require('../controllers/sessionController')

const router = express.Router();

router.post('/create-session', protect, createSession)
router.get('/interview-prep/:id', protect, getSessionById)
router.get('/my-session', protect, getMySession)
router.delete('/:id', protect, deleteSession)

module.exports = router