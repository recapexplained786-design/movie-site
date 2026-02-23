export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { movie } = req.body;

  if (!movie) {
    return res.status(400).json({ error: "Movie name required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "You are a Hindi movie explainer YouTuber."
          },
          {
            role: "user",
            content: `Write a detailed Hindi movie explanation script for the movie ${movie} in storytelling YouTube style.`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    const script = data.choices?.[0]?.message?.content || "No script generated";

    res.status(200).json({ script });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
