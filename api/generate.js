export default async function handler(req, res) {
  try {
    const movie = req.query.movie || req.body?.movie;

    if (!movie) {
      return res.status(400).json({ script: "No movie provided" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input:
          "Write a 10–15 minute Hindi YouTube movie explanation script of " +
          movie +
          " with strong hook, emotional storytelling, suspense narration, full story breakdown, twists, climax and engaging outro. Minimum 1800 words."
      })
    });

    const data = await response.json();

    const script =
      data.output?.[0]?.content?.[0]?.text ||
      "Script generation failed";

    res.status(200).json({ script });

  } catch (err) {
    res.status(500).json({ script: "Server error" });
  }
}
