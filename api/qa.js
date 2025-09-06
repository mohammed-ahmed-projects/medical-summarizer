import { HfInference } from "@huggingface/inference";

export default async (req, res) => {
    // Check for valid method (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Check for required input based on the new front-end code
    const { question, context } = req.body.inputs;
    if (!question || !context) {
        return res.status(400).json({ error: 'Missing required fields: question or context.' });
    }

    // Initialize Hugging Face Inference
    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
    if (!HUGGINGFACE_API_KEY) {
        return res.status(500).json({ error: 'API key not configured.' });
    }
    const hf = new HfInference(HUGGINGFACE_API_KEY);

    try {
        // Run the question-answering model
        const result = await hf.questionAnswering({
            model: "distilbert-base-cased-distilled-squad",
            inputs: {
                question: question,
                context: context,
            },
        });

        // Send back the answer
        res.status(200).json({ answer: result.answer });

    } catch (error) {
        console.error("Hugging Face API Error:", error.message);
        return res.status(500).json({ error: 'Failed to get an answer. Please check your API key and input.', details: error.message });
    }
};
