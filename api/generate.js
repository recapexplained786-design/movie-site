export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { movie } = req.body;

  if (!movie) {
    return res.status(400).json({ error: "Movie name required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        input: `Write a Hindi movie explanation script for ${movie} in YouTube storytelling style.`
      })
    });

    const data = await response.json();

    // ✅ Correct parsing (NEW API)
    const script =
      data.output?.[0]?.content?.[0]?.text ||
      "Script generate failed";

    res.status(200).json({ script });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
