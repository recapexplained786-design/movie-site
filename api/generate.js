export default async function handler(req, res) {
  try {
    let movie;

    if (req.method === "GET") {
      movie = req.query.movie;
    } else {
      const body = typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;
      movie = body?.movie;
    }

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
        model: "gpt-5-nano",
        input: `Write a Hindi YouTube movie explanation script for: ${movie}`
      })
    });

    const data = await response.json();

    const script =
      data.output?.[0]?.content?.[0]?.text ||
      data.output_text ||
      "Script generate failed";

    return res.status(200).json({ script });

  } catch (e) {
    return res.status(500).json({ script: "Server error" });
  }
}
