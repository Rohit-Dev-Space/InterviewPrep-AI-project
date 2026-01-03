const Session = require('../models/Session')
const Question = require('../models/Question')

const createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body
        const userId = req.user._id

        const session = await Session.create({
            user: userId,
            role: role,
            experience: experience,
            topicsToFocus: topicsToFocus,
            description: description,
        })
        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer
                })
                return question._id
            })
        )

        session.questions = questionDocs;
        await session.save()

        return res.status(200).json({ success: true, session })

    } catch (err) {
        return res.status(500).json({ message: 'Internal servver Error', error: err })
    }
}

const getSessionById = async (req, res) => {
    try {

        const session = await Session.findById(req.params.id).populate({
            path: 'questions',
            options: { sort: { isPinned: -1, createdAt: -1 } }
        })
        if (!session) {
            return res.status(404).json({ message: 'Session not found' })
        }
        return res.status(200).json({ success: true, session })

    } catch (err) {
        return res.status(500).json({ message: 'Internal servver Error', error: err })
    }
}
const getMySession = async (req, res) => {
    try {
        const session = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('questions')
        return res.status(200).json({ success: true, session })
    } catch (err) {
        return res.status(500).json({ message: 'Internal servver Error', error: err })
    }
}
const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
        if (!session) {
            return res.status(404).json({ message: 'Session not found' })
        }

        if (session.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' })
        }

        await Question.deleteMany({ session: session._id })
        await session.deleteOne()

        return res.status(200).json({ success: true, message: 'Session deleted successfully' })

    } catch (err) {
        return res.status(500).json({ message: 'Internal servver Error', error: err })
    }
}

module.exports = { createSession, getSessionById, getMySession, deleteSession }