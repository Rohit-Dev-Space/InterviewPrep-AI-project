const Question = require('../models/Question');
const Session = require('../models/Session');

const addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        return res.status(200).json({ createdQuestions });

    } catch (err) {
        return res.status(500).json({ message: 'Internal server Error', error: err });
    }
}
const updateQuestionNote = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        question.note = req.body.note || '';
        question.save();
        return res.status(200).json({ success: true, note: question.note });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server Error', error: err });
    }
}
const togglePinQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
        const isQuestion = await Question.findById(questionId);

        if (!isQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        isQuestion.isPinned = !isQuestion.isPinned;
        await isQuestion.save();

        return res.status(200).json({ success: true, isPinned: isQuestion.isPinned });

    } catch (err) {
        return res.status(500).json({ message: 'Internal server Error', error: err });
    }
}

module.exports = { togglePinQuestion, updateQuestionNote, addQuestionsToSession }