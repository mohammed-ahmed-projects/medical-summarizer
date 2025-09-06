import { HfInference } from "@huggingface/inference";

export default async (req, res) => {
    // Check for valid method (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Check for required input based on the new front-end code
    const { inputs, model } = req.body;
    if (!inputs) {
        return res.status(400).json({ error: 'Missing required fields: inputs or model.' });
    }

    // Initialize Hugging Face Inference
    const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
    if (!HUGGINGFACE_API_KEY) {
        return res.status(500).json({ error: 'API key not configured.' });
    }
    const hf = new HfInference(HUGGINGFACE_API_KEY);

    try {
        // Run the summarization model
        const result = await hf.summarization({
            model: model || "sshleifer/distilbart-cnn-12-6", // Use a default model if not provided
            inputs: inputs
        });

        // Send back the summarized text
        res.status(200).json({ summary_text: result.summary_text });

    } catch (error) {
        console.error("Hugging Face API Error:", error.message);
        return res.status(500).json({ error: 'Failed to generate summary. Please check your API key and input.', details: error.message });
    }
};
