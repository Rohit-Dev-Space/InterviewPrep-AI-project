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
    // safe extraction depending on SDK shape
    // supports: response.candidates[0].content.parts[0].text
    // or response.output?.[0]?.content?.[0]?.text (older variants)
    const text =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        response?.output?.[0]?.content?.[0]?.text ||
        response?.text || ''; // fallback
    return (typeof text === 'string') ? text : '';
}

const generateInterviewQuestion = async (req, res) => {
    try {
        const { role, topicsToFocus, experience, NumberofQuestions } = req.body;

        // validate
        if (!role || !topicsToFocus || !experience || !NumberofQuestions) {
            return res.status(400).json({ message: 'Invalid input data: missing fields', received: req.body });
        }

        // build prompt (you already have helper)
        const prompt = questionAnswerPrompt(role, topicsToFocus, experience, NumberofQuestions);
        console.log('[AI] prompt:', prompt.length ? prompt.slice(0, 800) : prompt); // log first 800 chars

        // correct request shape for @google/genai
        const apiCall = () => ai.models.generateContent({
            model: 'gemini-2.5-flash', // safer, available model family - change if needed
            contents: [
                { role: 'user', parts: [{ text: prompt }] }
            ],
            // optional: set safety or other params depending on SDK version
        });

        const response = await retry(apiCall, 2, 1000);
        const rawText = extractTextFromResponse(response);

        if (!rawText) {
            console.error('[AI] empty rawText, response:', JSON.stringify(response, null, 2));
            return res.status(500).json({ message: 'AI returned empty response', debug: true });
        }

        // clean and parse JSON safely
        const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        let data;
        try {
            data = JSON.parse(cleaned);
        } catch (parseErr) {
            console.error('[AI] JSON parse error. rawText:', rawText);
            return res.status(500).json({ message: 'AI returned invalid JSON', raw: cleaned });
        }

        return res.status(200).json({ data });
    } catch (err) {
        console.error('[AI] generateInterviewQuestion error:', err);
        // include status if present
        const status = err?.status || err?.response?.status || 500;
        return res.status(500).json({ message: 'Internal server Error', error: { message: err?.message || err, status } });
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

        const apiCall = () => ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                { role: 'user', parts: [{ text: prompt }] }
            ],
        });

        const response = await retry(apiCall, 2, 1000);
        const rawText = extractTextFromResponse(response);

        if (!rawText) {
            console.error('[AI] empty rawText for concept response:', JSON.stringify(response, null, 2));
            return res.status(500).json({ message: 'AI returned empty response' });
        }

        const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        let data;
        try {
            data = JSON.parse(cleaned);
        } catch (parseErr) {
            console.error('[AI] JSON parse error (concept). rawText:', rawText);
            return res.status(500).json({ message: 'AI returned invalid JSON', raw: cleaned });
        }

        return res.status(200).json({ data });
    } catch (err) {
        console.error('[AI] generateConceptExplanation error:', err);
        const status = err?.status || err?.response?.status || 500;
        return res.status(500).json({ message: 'Internal server Error', error: { message: err?.message || err, status } });
    }
};

module.exports = { generateInterviewQuestion, generateConceptExplanation };
