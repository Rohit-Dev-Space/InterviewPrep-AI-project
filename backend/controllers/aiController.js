// controllers/aiController.js
const { GoogleGenAI } = require('@google/genai');
const { conceptExplanationPrompt, questionAnswerPrompt } = require('../utils/prompts');

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// small retry helper for 429
async function retry(fn, retries = 2, delay = 1000) {
    try {
        return await fn();
    } catch (err) {
        const status = err?.status || err?.response?.status;
        if (retries > 0 && status === 429) {
            await new Promise(r => setTimeout(r, delay));
            return retry(fn, retries - 1, delay * 2);
        }
        throw err;
    }
}

function extractTextFromResponse(response) {
    const text =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        response?.output?.[0]?.content?.[0]?.text ||
        response?.text ||
        '';
    return typeof text === 'string' ? text : '';
}

// helper to remove markdown and clean JSON
function cleanJsonText(text) {
    return text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
}

const generateInterviewQuestion = async (req, res) => {
    try {
        const { role, topicsToFocus, experience, NumberofQuestions } = req.body;

        // validate
        if (
            role === undefined || role === null ||
            topicsToFocus === undefined || topicsToFocus === null ||
            experience === undefined || experience === null ||
            NumberofQuestions === undefined || NumberofQuestions === null
        ) {
            return res.status(400).json({
                message: 'Invalid input data: missing fields',
                received: req.body
            });
        }

        const prompt = questionAnswerPrompt(role, topicsToFocus, experience, NumberofQuestions);
        console.log('[AI] prompt:', prompt.length ? prompt.slice(0, 800) : prompt);

        const apiCall = () =>
            ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [{ role: 'user', parts: [{ text: prompt }] }]
            });

        const response = await retry(apiCall, 2, 1000);

        const rawText = extractTextFromResponse(response);

        if (!rawText) {
            console.error('[AI] empty AI response:', JSON.stringify(response, null, 2));
            return res.status(500).json({
                message: 'AI returned empty response',
                debug: true
            });
        }

        const cleaned = cleanJsonText(rawText);

        let data;
        try {
            data = JSON.parse(cleaned);
        } catch (parseErr) {
            console.error('[AI] JSON parse error. cleaned:', cleaned);
            return res.status(500).json({
                message: 'AI returned invalid JSON',
                raw: cleaned
            });
        }

        return res.status(200).json({ data });
    } catch (err) {
        console.error('[AI] generateInterviewQuestion error:', err);

        const status = err?.status || err?.response?.status || 500;

        return res.status(500).json({
            message: 'Internal server Error',
            error: {
                message: err?.message || err,
                status
            }
        });
    }
};

const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const prompt = conceptExplanationPrompt(question);
        console.log('[AI] concept prompt length:', prompt.length);

        const apiCall = () =>
            ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [{ role: 'user', parts: [{ text: prompt }] }]
            });

        const response = await retry(apiCall, 2, 1000);

        const rawText = extractTextFromResponse(response);

        if (!rawText) {
            console.error('[AI] empty concept AI response:', JSON.stringify(response, null, 2));
            return res.status(500).json({
                message: 'AI returned empty response'
            });
        }

        const cleaned = cleanJsonText(rawText);

        let data;
        try {
            data = JSON.parse(cleaned);
        } catch (parseErr) {
            console.error('[AI] JSON parse error (concept). cleaned:', cleaned);
            return res.status(500).json({
                message: 'AI returned invalid JSON',
                raw: cleaned
            });
        }

        return res.status(200).json({ data });
    } catch (err) {
        console.error('[AI] generateConceptExplanation error:', err);

        const status = err?.status || err?.response?.status || 500;

        return res.status(500).json({
            message: 'Internal server Error',
            error: {
                message: err?.message || err,
                status
            }
        });
    }
};

module.exports = {
    generateInterviewQuestion,
    generateConceptExplanation
};