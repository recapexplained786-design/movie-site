export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { movie } = req.body;

    if (!movie) {
      return res.status(400).json({ error: "Movie name required" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Explain the movie ${movie} in Hindi in a YouTube narration style script.`
          }
        ],
        max_tokens: 700
      })
    });

    const data = await response.json();

    const script =
      data?.choices?.[0]?.message?.content || "Script generate failed";

    res.status(200).json({ script });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
