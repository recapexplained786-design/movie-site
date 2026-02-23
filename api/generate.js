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
        input: `Explain the movie ${movie} in Hindi in a YouTube narration style.`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(500).json({ error: "OpenAI error" });
    }

    const text = data.output?.[0]?.content?.[0]?.text || "No script";

    return res.status(200).json({ script: text });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
