export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Extracting the prompt from the incoming request
    const { prompt } = await req.json();

    // System instruction for the prompt engineer model
    const systemInstruction = `
      You are a prompt engineer. 
      Your task is to take the given design description written in Roman Urdu and convert it into a professional, clear, two- to three-line English prompt.
      Maintain the original intention, expand meaningfully if needed, and format it properly.
    `;

    // Fetch request to OpenRouter API for processing the prompt
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
            content: systemInstruction.trim(),
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    // Handle failed API request
    if (!response.ok) {
      const error = await response.text();
      return new Response(
        JSON.stringify({
          error: "API request failed",
          details: error,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Parse and return the result from the API response
    const data = await response.json();
    console.log("OpenRouter API Response:", data); 

    const result = data.choices?.[0]?.message?.content || "No result found.";

    // Return the response to the client
    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    // Handle unexpected errors
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
