import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { handleZeeApiRequest } from "./routes/api/zee";

const apiMiddleware = createMiddleware({ type: "request" }).server(async ({ request, next }) => {
  try {
    const url = new URL(request.url);
    if (url.pathname === "/api/zee") {
      return await handleZeeApiRequest(request);
    }
  } catch (err) {
    console.error("[Start Middleware] Error handling API route:", err);
  }
  return await next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [apiMiddleware, errorMiddleware],
}));
