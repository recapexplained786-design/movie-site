export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { movie } = req.body;

    if (!movie) {
      return res.status(400).json({ error: "No movie name" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        input: `Write a Hindi YouTube movie explanation script for ${movie} in storytelling style.`,
      }),
    });

    const data = await response.json();

    const text =
      data.output?.[0]?.content?.[0]?.text ||
      "Script generate failed";

    res.status(200).json({ script: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
