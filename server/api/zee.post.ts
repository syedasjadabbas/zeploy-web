import { defineEventHandler, readBody, createError } from "h3";
import { generateZeeReply } from "../../src/lib/server/zee.server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ZeeRequestBody {
  message?: string;
  history?: ChatMessage[];
}

export default defineEventHandler(async (event) => {
  try {
    const body: ZeeRequestBody = await readBody(event).catch(() => ({}));

    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (!message) {
      throw createError({
        statusCode: 400,
        statusMessage: "The 'message' field is required and cannot be empty.",
      });
    }

    if (message.length > 2000) {
      throw createError({
        statusCode: 400,
        statusMessage: "Message length exceeds maximum limit of 2000 characters.",
      });
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
          .slice(-10)
      : [];

    const reply = await generateZeeReply(message, history);

    return { reply };
  } catch (error: any) {
    if (error?.statusCode) {
      throw error;
    }
    console.error("Unhandled error in Nitro /api/zee endpoint:", error);
    return {
      reply:
        "I encountered an unexpected issue while processing your message. Please reach out directly to the Zeploy team at zeploytech@gmail.com or via WhatsApp at +923033236878.",
    };
  }
});
