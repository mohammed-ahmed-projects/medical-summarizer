import fetch from 'node-fetch';

export default async function (req, res) {
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
  const SUMMARIZATION_ENDPOINT = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    const response = await fetch(SUMMARIZATION_ENDPOINT, {
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API call failed: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    return res.status(200).json(result);

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
