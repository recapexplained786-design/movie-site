export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ script: "Method not allowed" });
  }

  try {
    const { movie } = req.body || {};

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
        input: `Explain the movie ${movie} in Hindi in simple YouTube narration style.`
      })
    });

    const data = await response.json();

    const script =
      data.output?.[0]?.content?.[0]?.text ||
      "Script generate failed";

    res.status(200).json({ script });

  } catch (e) {
    res.status(500).json({ script: "Server error" });
  }
}
