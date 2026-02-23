async function generate(){
  const movie=document.getElementById("movie").value.trim();
  const out=document.getElementById("out");

  if(!movie){
    out.innerText="Enter movie name";
    return;
  }

  out.innerText="Generating 10–15 min script...";

  try{
    const prompt =
      "Write a 10–15 minute Hindi YouTube movie explanation script of "+movie+
      " with a strong cinematic hook, emotional narration, suspenseful storytelling, full story breakdown, climax explanation and impactful ending. "+
      "Make it highly engaging and conversational like a professional movie explanation channel. "+
      "Minimum 1800 words. Include hook, story, twists and outro CTA.";

    const res = await fetch(
      "https://api.allorigins.win/raw?url="+encodeURIComponent(prompt)
    );

    const text = await res.text();
    out.innerText = text || "No script generated";

  }catch(e){
    out.innerText="Error generating script";
  }
}
