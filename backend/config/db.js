const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {})
        console.log('MongoDB connected')
    } catch (err) {
        console.error("Could not connect MongoDB : ", err)
        process.exit(1)
    }
}

module.exports = { connectDB }