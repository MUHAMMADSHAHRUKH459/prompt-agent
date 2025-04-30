export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.queryResult?.queryText || "No query provided.";

    const systemInstruction = `
      You are a prompt engineer. 
      Your task is to take the given design description written in Roman Urdu and convert it into a professional, clear, two- to three-line English prompt.
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemInstruction.trim() },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenRouter API Response:", data);

    const result = data.choices?.[0]?.message?.content || "No result found.";

    return new Response(JSON.stringify({ fulfillmentText: result }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({
        fulfillmentText: "Something went wrong. Please try again later.",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
