import { HfInference } from "@huggingface/inference";

export default async (req, res) => {
    // 1. Check for valid method (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 2. Check for required input
    const { text, model } = req.body;
    if (!text || !model) {
        return res.status(400).json({ error: 'Missing required fields: text or model.' });
    }

    // 3. Initialize Hugging Face Inference
    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
    if (!HUGGINGFACE_API_KEY) {
        return res.status(500).json({ error: 'API key not configured.' });
    }
    const hf = new HfInference(HUGGINGFACE_API_KEY);

    try {
        // 4. Run the summarization model
        const result = await hf.summarization({
            model: model,
            inputs: text
        });

        // 5. Send back the summarized text
        res.status(200).json({ summary: result.summary_text });

    } catch (error) {
        console.error("Hugging Face API Error:", error.message);
        return res.status(500).json({ error: 'Failed to generate summary. Please check your API key and input.', details: error.message });
    }
};
