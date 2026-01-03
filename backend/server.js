require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const path = require('path')
const protect = require('./middleware/authMiddleware')
const { connectDB } = require('./config/db')

const app = express();

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'PUT', 'DELETE', 'POST'],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

connectDB()
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, "uploads"), {}))


const authRoutes = require('./routes/authRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const questionRoutes = require('./routes/questionRoutes')
const { generateInterviewQuestion, generateConceptExplanation } = require('./controllers/aiController')


app.use('/api/auth', authRoutes)
app.use('/api/session', sessionRoutes)
app.use('/api/question', questionRoutes)

app.use('/api/ai/generate-question', protect, generateInterviewQuestion)
app.use('/api/ai/generate-explanation', protect, generateConceptExplanation)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server running on https://localhost:5000')
})