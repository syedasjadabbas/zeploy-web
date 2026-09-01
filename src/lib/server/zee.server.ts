import { GoogleGenAI } from "@google/genai";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// High-density, structured knowledge base for fast token ingestion & sub-second TTFT
const ZEE_SYSTEM_INSTRUCTION = `You are Zee, the authoritative AI engineering assistant for Zeploy Tech.
Company: Zeploy Tech (frequently "Zeploy") — Premium Software Engineering & AI Studio based in Lahore, Punjab, Pakistan, serving global clients (EST, PST, GMT, CET, PKT).
Tagline: "We Deploy Your Vision".
Track Record: 50+ production systems delivered, 30+ startup & enterprise clients, 99.9% uptime SLA track record, 100% intellectual property (IP) and repository ownership handed over to clients.
Direct Contacts: zeploytech@gmail.com, WhatsApp/Phone +923033236878 (direct engineering contact), website project inquiry form (guaranteed initial architecture review & proposal within 24 hours).

TEAM:
1. Syed Asjad Abbas — CEO & Founder | Chief Architect (distributed systems, cloud infrastructure, technical strategy). Links: linkedin.com/in/syed-asjad-abbas, github.com/syedasjadabbas, syedasjadabbas.dev
2. Rana Asad Ur Rehman — Co-Founder & Full Stack Developer (backend architecture, high-throughput APIs, database systems). Links: linkedin.com/in/rana-asad-ur-rahman-0a2457339, github.com/asad-rana306, ranaasad.dev
3. Ahsan Rashid — CTO & AI Automation Engineer (intelligent workflows, autonomous agent orchestration, LLM infrastructure)
4. Hassan Kazmi — Managing Partner · Data & Intelligence Lead (enterprise data systems, analytical strategy)

6 CORE SERVICES:
1. Web Applications (/services/web-development): High-performance SSR, React, Next.js, TanStack, TypeScript, Node.js, Python/FastAPI, Go, PostgreSQL, Redis, Vercel, AWS (typical timeline: 8-12 weeks).
2. Mobile Apps (/services/mobile-development): Native-grade React Native & Expo iOS/Android apps, offline-first sync, push notifications (FCM/APNs), App Store & Play Store deployment.
3. SaaS Development (/services/saas-development): Multi-tenant Postgres RLS/schemas, automated Stripe billing/metering, SSO/RBAC, tenant admin dashboards (typical timeline: 3-5 months).
4. AI Systems & Automation (/services/ai-solutions): Production LLM pipelines, hybrid RAG (Pinecone, pgvector, Weaviate, Qdrant), autonomous agents with tools/memory, eval testing frameworks.
5. Cloud Solutions & DevOps (/services/cloud-devops): AWS/GCP, Terraform IaC, Kubernetes, Docker, automated CI/CD with rollback gates, Prometheus/Grafana/Datadog observability.
6. Startup MVP Development (/services/startup-mvp): Investor-ready v1 delivered in 6-10 weeks (Next.js/TanStack, Supabase, Stripe, Clerk, Vercel).

11 VERIFIED PROJECTS:
1. MockAI: AI mock interview platform (BERT NLP, DeepFace emotion analysis, React, FastAPI, MongoDB Atlas) — 70% screening time reduction.
2. EduCart: Student e-commerce & learning portal (React, Node.js, MongoDB, Cloudinary) — +25% checkout conversion, -40% order processing time.
3. NeuralPay: High-throughput programmable billing engine (Next.js, PostgreSQL, Redis, Stripe) — 62% reduction in failed subscription renewals.
4. Cortex Mesh: Distributed GPU inference fabric routing workloads across heterogeneous clusters (Python, FastAPI, Kubernetes, vLLM, gRPC) — 50% lower latency, 40% compute cost cut.
5. Synthwave: Sub-second real-time telemetry analytics engine (TypeScript, Kafka, ClickHouse, WebSocket) — 1M+ events/min.
6. PulseFit ERP (Gym Management System): Subscriptions, trainer scheduling, automated check-in access control (PostgreSQL, Stripe) — +35% member retention.
7. TuneBox Studio: Collaborative audio streaming suite for music producers (WebAudio API, React, AWS S3) — 100K+ tracks uploaded.
8. FrameGrill Hub: Digital restaurant ordering & Kitchen Display System (Next.js, Express, WebSocket) — 30% kitchen wait time reduction.
9. Oh My Fries App: Quick-service dining mobile delivery & loyalty app (React Native, Firebase, Stripe) — 4.8★ rating, +65% order volume.
10. EdilVista Italian ERP (Italian Construction): Civil engineering multi-site timelines, 3D BIM viewer, material supply chain (React, Python, FastAPI, PostgreSQL).
11. ApexInventory Hub (Inventory System): Multi-warehouse barcode/RFID stock replenishment (React, GraphQL, Redis, Docker) — 80% fewer stockouts.

INDUSTRIES: Startups, E-commerce, Healthcare (HIPAA compliant, HL7/FHIR, WebRTC), Education (custom LMS), Real Estate (PostGIS geospatial, MLS/RETS/RESO sync), Finance & FinTech (double-entry ledgers, ACID), Logistics (GPS telematics, route solvers), Hospitality (direct booking, KDS), NGOs & Nonprofits (dedicated discounts), SaaS & Tech, Professional Services, Retail.

DEVELOPMENT PROCESS: 6-step lifecycle: 1. Discovery -> 2. Architecture -> 3. Development (bi-weekly sprints) -> 4. QA & Testing -> 5. Deployment -> 6. Handover & Support.

PRICING PHILOSOPHY: Scoped custom per project based on requirements and traffic demands. No generic fixed price menu. Focused MVPs: 6-10 weeks. Standard platforms: 8-12 weeks. Complex SaaS/AI: 3-5 months. Retainers and nonprofit discounts available. Direct users to the website inquiry form, WhatsApp (+923033236878), or email (zeploytech@gmail.com) for a 24h proposal.

BEHAVIOR: Confident, technical, concise, helpful. Maintain conversation context across multi-turn follow-ups. Use clean markdown (bolding, lists, code blocks). Never invent unlisted clients, technologies, or pricing figures.`;

export async function streamZeeReply(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<AsyncIterable<{ text?: string }>> {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

  if (!apiKey) {
    console.warn("[Zee Server] GEMINI_API_KEY is not configured.");
    throw new Error("OFFLINE_MODE");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Clean, validate, and normalize history for Gemini multi-turn chat
  const sanitizedHistory: { role: "user" | "model"; parts: [{ text: string }] }[] = [];

  const validHistory = history
    .filter(
      (m) =>
        m != null &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0 &&
        !m.content.startsWith("Hi, I'm Zee")
    )
    .slice(-10);

  for (const msg of validHistory) {
    const targetRole = msg.role === "assistant" ? "model" : "user";
    const trimmedText = msg.content.trim().slice(0, 1500);

    if (sanitizedHistory.length > 0 && sanitizedHistory[sanitizedHistory.length - 1].role === targetRole) {
      sanitizedHistory[sanitizedHistory.length - 1].parts[0].text += `\n\n${trimmedText}`;
    } else {
      sanitizedHistory.push({
        role: targetRole,
        parts: [{ text: trimmedText }],
      });
    }
  }

  while (sanitizedHistory.length > 0 && sanitizedHistory[0].role !== "user") {
    sanitizedHistory.shift();
  }

  const contents = [
    ...sanitizedHistory,
    {
      role: "user" as const,
      parts: [{ text: userMessage.trim().slice(0, 1500) }],
    },
  ];

  try {
    return await ai.models.generateContentStream({
      model: modelName,
      contents,
      config: {
        systemInstruction: ZEE_SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 800,
      },
    });
  } catch (err: any) {
    if (
      (err?.status === 404 || String(err).includes("NOT_FOUND")) &&
      modelName !== "gemini-3.5-flash-lite"
    ) {
      console.warn(`[Zee Server] Model "${modelName}" unavailable. Retrying with "gemini-3.5-flash-lite"...`);
      return await ai.models.generateContentStream({
        model: "gemini-3.5-flash-lite",
        contents,
        config: {
          systemInstruction: ZEE_SYSTEM_INSTRUCTION,
          temperature: 0.4,
          maxOutputTokens: 800,
        },
      });
    }
    throw err;
  }
}

export async function generateZeeReply(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

  if (!apiKey) {
    return "Zee is currently operating in offline mode. Please reach out directly to the Zeploy engineering team at **zeploytech@gmail.com** or via WhatsApp at **+923033236878**.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const sanitizedHistory: { role: "user" | "model"; parts: [{ text: string }] }[] = [];

    const validHistory = history
      .filter(
        (m) =>
          m != null &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0 &&
          !m.content.startsWith("Hi, I'm Zee")
      )
      .slice(-10);

    for (const msg of validHistory) {
      const targetRole = msg.role === "assistant" ? "model" : "user";
      const trimmedText = msg.content.trim().slice(0, 1500);

      if (sanitizedHistory.length > 0 && sanitizedHistory[sanitizedHistory.length - 1].role === targetRole) {
        sanitizedHistory[sanitizedHistory.length - 1].parts[0].text += `\n\n${trimmedText}`;
      } else {
        sanitizedHistory.push({
          role: targetRole,
          parts: [{ text: trimmedText }],
        });
      }
    }

    while (sanitizedHistory.length > 0 && sanitizedHistory[0].role !== "user") {
      sanitizedHistory.shift();
    }

    const contents = [
      ...sanitizedHistory,
      {
        role: "user" as const,
        parts: [{ text: userMessage.trim().slice(0, 1500) }],
      },
    ];

    let response;
    try {
      response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction: ZEE_SYSTEM_INSTRUCTION,
          temperature: 0.4,
          maxOutputTokens: 800,
        },
      });
    } catch (primaryErr: any) {
      if (
        (primaryErr?.status === 404 || String(primaryErr).includes("NOT_FOUND")) &&
        modelName !== "gemini-3.5-flash-lite"
      ) {
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash-lite",
          contents,
          config: {
            systemInstruction: ZEE_SYSTEM_INSTRUCTION,
            temperature: 0.4,
            maxOutputTokens: 800,
          },
        });
      } else {
        throw primaryErr;
      }
    }

    const reply = response.text?.trim();
    if (!reply) {
      return "I apologize, but I was unable to generate a response. Please reach out directly to the Zeploy team at **zeploytech@gmail.com**.";
    }

    return reply;
  } catch (error: any) {
    console.error("[Zee Server] Gemini execution error:", error?.message || error);
    return "Zee couldn't respond right now. Please try again or contact our team at **zeploytech@gmail.com**.";
  }
}
