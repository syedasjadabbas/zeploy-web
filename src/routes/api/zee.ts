import { generateZeeReply } from "@/lib/server/zee.server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ZeeRequestBody {
  message?: string;
  history?: ChatMessage[];
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
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Expected POST." }),
      {
        status: 405,
        headers: {
          "content-type": "application/json",
          allow: "POST, OPTIONS",
        },
      }
    );
  }

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
          headers: { "content-type": "application/json" },
        }
      );
    }

    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (!message) {
      return new Response(
        JSON.stringify({ error: "The 'message' field is required and cannot be empty." }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
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
          headers: { "content-type": "application/json" },
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

    console.log(
      `[/api/zee] Received request: "${message.slice(0, 50)}${message.length > 50 ? "..." : ""}" (History turns: ${history.length})`
    );

    const reply = await generateZeeReply(message, history);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[/api/zee] Unhandled exception in route handler:", error);
    return new Response(
      JSON.stringify({
        reply:
          "I encountered an unexpected issue while processing your message. Please reach out directly to the Zeploy team at zeploytech@gmail.com or via WhatsApp at +923033236878.",
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}

export const APIRoute = createAPIFileRoute("/api/zee")({
  POST: async ({ request }) => handleZeeApiRequest(request),
});
