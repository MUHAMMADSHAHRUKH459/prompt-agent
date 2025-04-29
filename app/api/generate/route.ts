export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const systemInstruction = `
You are a prompt engineer. 
Your task is to take the given design description written in Roman Urdu and convert it into a professional, clear, two, three line English prompt.
Maintain the original intention, expand meaningfully if needed, and format it properly.
`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemInstruction,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json();
  const result = data.choices[0]?.message?.content || "No result found.";

  return new Response(JSON.stringify({ result }), {
    headers: { "Content-Type": "application/json" },
  });
}
