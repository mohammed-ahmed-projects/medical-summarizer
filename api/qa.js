import { HfInference } from "@huggingface/inference";

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { question, context } = req.body;
    if (!question || !context) {
        return res.status(400).json({ error: 'Missing required fields: question or context.' });
    }

    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
    if (!HUGGINGFACE_API_KEY) {
        return res.status(500).json({ error: 'API key not configured.' });
    }
    const hf = new HfInference(HUGGINGFACE_API_KEY);

    try {
        const result = await hf.questionAnswering({
            model: "distilbert-base-cased-distilled-squad",
            inputs: {
                question: question,
                context: context,
            },
        });

        res.status(200).json({ answer: result.answer });

    } catch (error) {
        console.error("Hugging Face API Error:", error.message);
        return res.status(500).json({ error: 'Failed to get an answer. Please check your API key and input.', details: error.message });
    }
};
