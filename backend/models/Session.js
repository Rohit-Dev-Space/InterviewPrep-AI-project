const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, required: true },
    experience: { type: Number, required: true },
    topicsToFocus: { type: String, required: true },
    description: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question", }],
}, {
    timestamps: true
})

module.exports = mongoose.model("Session", schema)

