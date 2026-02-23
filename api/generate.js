export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { movie } = req.body;

    if (!movie) {
      return res.status(400).json({ error: "No movie provided" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        input: `Explain the movie ${movie} in Hindi in a cinematic storytelling style for a YouTube video script.`,
      }),
    });

    const data = await response.json();

    const text =
      data.output?.[0]?.content?.[0]?.text ||
      data.output_text ||
      "No script generated";

    res.status(200).json({ script: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
