import { generateZeeReply, streamZeeReply } from "@/lib/server/zee.server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ZeeRequestBody {
  message?: string;
  history?: ChatMessage[];
  stream?: boolean;
}

type APIHandler = ({ request }: { request: Request }) => Promise<Response> | Response;

interface APIRouteConfig {
  GET?: APIHandler;
  POST?: APIHandler;
  PUT?: APIHandler;
  DELETE?: APIHandler;
  PATCH?: APIHandler;
  OPTIONS?: APIHandler;
  HEAD?: APIHandler;
}

export function createAPIFileRoute(path: string) {
  return (config: APIRouteConfig) => ({
    path,
    ...config,
  });
}

export async function handleZeeApiRequest(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Expected POST." }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          Allow: "POST, OPTIONS",
        },
      }
    );
  }

  const url = new URL(request.url);
  const acceptHeader = request.headers.get("accept") || "";
  const wantsStream =
    url.searchParams.get("stream") === "true" ||
    acceptHeader.includes("text/event-stream");

  try {
    let body: ZeeRequestBody;
    try {
      const cloned = request.clone();
      body = await cloned.json();
    } catch (parseErr) {
      console.error("[/api/zee] JSON parsing error:", parseErr);
      return new Response(
        JSON.stringify({ error: "Malformed JSON payload in request body." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (!message) {
      return new Response(
        JSON.stringify({ error: "The 'message' field is required and cannot be empty." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (message.length > 2000) {
      return new Response(
        JSON.stringify({
          error: "Message length exceeds the maximum allowed limit of 2,000 characters.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(
            (item): item is ChatMessage =>
              item != null &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string" &&
              item.content.trim().length > 0
          )
          .slice(-14)
      : [];

    const isStreamingRequest = wantsStream || body.stream === true;

    console.log(
      `[/api/zee] Received request (streaming: ${isStreamingRequest}): "${message.slice(0, 40)}..." (History turns: ${history.length})`
    );

    if (isStreamingRequest) {
      try {
        const stream = await streamZeeReply(message, history);
        const encoder = new TextEncoder();

        const readable = new ReadableStream({
          async start(controller) {
            // Immediate flush comment to establish SSE connection and achieve instant TTFB
            controller.enqueue(encoder.encode(": connected\n\n"));
            try {
              for await (const chunk of stream) {
                const text = chunk.text;
                if (text) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ delta: text })}\n\n`)
                  );
                }
              }
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
            } catch (streamError: any) {
              console.error("[/api/zee] Stream iteration error:", streamError?.message || streamError);
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    error: "A temporary error occurred while generating the response stream.",
                  })}\n\n`
                )
              );
              controller.close();
            }
          },
        });

        return new Response(readable, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
          },
        });
      } catch (err: any) {
        if (err?.message === "OFFLINE_MODE") {
          const offlineMsg =
            "Zee is currently operating in offline mode (API key is not configured in this environment). Please reach out directly to the Zeploy engineering team at **zeploytech@gmail.com** or via WhatsApp at **+923033236878**.";
          const encoder = new TextEncoder();
          const readable = new ReadableStream({
            start(controller) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ delta: offlineMsg })}\n\n`)
              );
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
            },
          });
          return new Response(readable, {
            status: 200,
            headers: {
              "Content-Type": "text/event-stream; charset=utf-8",
              "Cache-Control": "no-cache, no-transform",
            },
          });
        }

        console.error("[/api/zee] Failed to initiate stream, falling back to unary:", err?.message || err);
        const reply = await generateZeeReply(message, history);
        return new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        });
      }
    }

    // Non-streaming response
    const reply = await generateZeeReply(message, history);
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("[/api/zee] Unhandled exception in route handler:", error?.message || error);
    return new Response(
      JSON.stringify({
        reply:
          "I encountered an unexpected issue while processing your message. Please reach out directly to the Zeploy team at zeploytech@gmail.com or via WhatsApp at +923033236878.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}

export const APIRoute = createAPIFileRoute("/api/zee")({
  POST: async ({ request }) => handleZeeApiRequest(request),
});
