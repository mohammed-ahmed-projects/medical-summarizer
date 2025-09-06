import { HfInference } from "@huggingface/inference";

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { text, model } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Missing required fields: text or model.' });
    }

    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
    if (!HUGGINGFACE_API_KEY) {
        return res.status(500).json({ error: 'API key not configured.' });
    }
    const hf = new HfInference(HUGGINGFACE_API_KEY);

    try {
        const result = await hf.summarization({
            model: "facebook/bart-large-cnn",
            inputs: text
        });

        res.status(200).json({ summary_text: result.summary_text });

    } catch (error) {
        console.error("Hugging Face API Error:", error.message);
        return res.status(500).json({ error: 'Failed to generate summary. Please check your API key and input.', details: error.message });
    }
};
