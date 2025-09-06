import { HfInference } from "@huggingface/inference";

export default async (req, res) => {
    // 1. Check for valid method (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 2. Check for required input
    const { question, context } = req.body;
    if (!question || !context) {
        return res.status(400).json({ error: 'Missing required fields: question or context.' });
    }

    // 3. Initialize Hugging Face Inference
    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
    if (!HUGGINGFACE_API_KEY) {
        return res.status(500).json({ error: 'API key not configured.' });
    }
    const hf = new HfInference(HUGGINGFACE_API_KEY);

    try {
        // 4. Run the question-answering model
        const result = await hf.questionAnswering({
            model: "distilbert-base-cased-distilled-squad",
            inputs: {
                question: question,
                context: context,
            },
        });

        // 5. Send back the answer
        res.status(200).json({ answer: result.answer });

    } catch (error) {
        console.error("Hugging Face API Error:", error.message);
        return res.status(500).json({ error: 'Failed to get an answer. Please check your API key and input.', details: error.message });
    }
};
