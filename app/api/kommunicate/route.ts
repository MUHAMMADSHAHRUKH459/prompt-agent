export async function POST(req: Request) {
    try {
      const body = await req.json();
  
      // Kommunicate request se message extract karo
      const prompt = body.message || body.query || "Prompt missing";
  
      // Aapke original webhook pe request forward karo
      const response = await fetch("https://prompt-agent-azure.vercel.app/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
  
      return new Response(JSON.stringify({ reply: data.result || "No response" }), {
        headers: { "Content-Type": "application/json" },
      });
  
    } catch (err) {
      const error = err as Error;
      return new Response(JSON.stringify({ error: "Webhook failed", details: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  