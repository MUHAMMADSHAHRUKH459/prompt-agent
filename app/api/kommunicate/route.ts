export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.queryResult?.queryText || "No input received.";

    const systemInstruction = `
      You are a prompt engineer. 
      Your task is to take the given design description written in Roman Urdu and convert it into a professional, clear, two- to three-line English prompt.
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
          { role: "system", content: systemInstruction.trim() },
          { role: "user", content: prompt }
        ]
      }),
    });

    const data = await response.json();
    console.log("OpenRouter API Response:", data); // ✅ Debugging ke liye

    const result = data.choices?.[0]?.message?.content || "No result from AI.";

    // Return response in Dialogflow-compatible format
    return new Response(
      JSON.stringify({ fulfillmentText: result }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        fulfillmentText: "Sorry, there was an error processing your request.",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
