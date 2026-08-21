export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  meta: { title: string; description: string; canonical: string };
  overview: string;
  problems: { heading: string; body: string }[];
  deliverables: string[];
  capabilities: { label: string; items: string[] }[];
  stack: string[];
  approach: { step: string; desc: string }[];
  relatedProjects: { name: string; kind: string }[];
  faq: { q: string; a: string }[];
  relatedIndustries: { label: string; slug: string }[];
  image: string;
  imageAlt: string;
}

export const services: ServiceData[] = [
  {
    slug: "web-development",
    title: "Web Applications",
    tagline: "High-performance web platforms engineered for scale, speed, and longevity.",
    meta: {
      title: "Web Application Development | Zeploy Tech",
      description: "Zeploy builds high-performance, production-grade web applications using React, Next.js, and edge-rendered SSR. Scalable, fast, and built to last.",
      canonical: "https://www.zeploy.tech/services/web-development",
    },
    overview: "We build web applications that handle real production load from day one. Every product is designed with a clear architecture, a type-safe API layer, and a deployment pipeline that supports zero-downtime releases. Whether you need an internal tool, a customer-facing platform, or a high-traffic SaaS, our team ships systems that scale.",
    problems: [
      { heading: "Slow, unreliable legacy systems", body: "Outdated stacks slow your team and frustrate users. We replatform or rebuild with modern, maintainable architecture." },
      { heading: "Poor performance at scale", body: "Traffic spikes should not cause downtime. We design for horizontal scale from the start, not as an afterthought." },
      { heading: "No clear ownership after delivery", body: "We hand over production-ready repos with full documentation, CI/CD, and monitoring — not just a zip file." },
    ],
    deliverables: [
      "Full-stack web application (frontend + backend + API)",
      "Type-safe REST or GraphQL API with documentation",
      "Production-grade CI/CD pipeline",
      "Automated test suite (unit + integration + e2e)",
      "Monitoring and observability setup",
      "Performance optimization report",
      "Full codebase handover with README",
    ],
    capabilities: [
      { label: "Frontend", items: ["React", "Next.js", "TanStack", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Python / FastAPI", "Go", "PostgreSQL", "Redis"] },
      { label: "Infrastructure", items: ["Vercel", "AWS", "Docker", "Terraform", "GitHub Actions"] },
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Vercel", "AWS"],
    approach: [
      { step: "Discovery", desc: "We map your system requirements, data model, and user flows before writing a single line of code." },
      { step: "Architecture", desc: "API contracts, database schema, and deployment topology documented and reviewed." },
      { step: "Development", desc: "Two-week verticals shipped to staging with async PR reviews by a senior engineer." },
      { step: "QA & Testing", desc: "Automated, performance, and security tests baked into the pipeline." },
      { step: "Deployment", desc: "Zero-downtime launch with observability live from the first request." },
      { step: "Handover", desc: "Full codebase, docs, and access transferred. Retainer support available." },
    ],
    relatedProjects: [
      { name: "Cortex", kind: "AI SaaS Platform" },
      { name: "EduCart", kind: "E-Learning Platform" },
      { name: "NeuralPay", kind: "FinTech Platform" },
    ],
    faq: [
      { q: "How long does a web application take to build?", a: "A standard product with auth, a core domain, and an API typically takes 8-12 weeks. Complex multi-tenant SaaS takes 3-5 months. We scope every project precisely during discovery." },
      { q: "Do you build the backend too?", a: "Yes. We deliver the complete stack — frontend, backend, API, database schema, and infrastructure — in a single engagement." },
      { q: "What happens after launch?", a: "We offer retainer-based ongoing support covering scaling, feature development, and observability. Most clients stay on retainer." },
      { q: "Do we own the source code?", a: "Yes. You own the full repository and all IP from day one." },
    ],
    relatedIndustries: [
      { label: "SaaS & Technology", slug: "saas" },
      { label: "E-commerce", slug: "ecommerce" },
      { label: "Finance & FinTech", slug: "fintech" },
    ],
    image: "/detail/services/web-development.webp",
    imageAlt: "Modern web application dashboard interface built by Zeploy Tech",
  },
  {
    slug: "mobile-development",
    title: "Mobile Apps",
    tagline: "Native-grade iOS and Android products built on a unified codebase.",
    meta: {
      title: "Mobile App Development | Zeploy Tech",
      description: "Zeploy builds cross-platform iOS and Android apps with React Native — offline-first, push notifications, and native-grade performance.",
      canonical: "https://www.zeploy.tech/services/mobile-development",
    },
    overview: "Mobile users have zero tolerance for slow, buggy apps. We build React Native applications that match the performance expectations of native iOS and Android without the cost of maintaining two separate codebases. Every app includes background sync, offline-first architecture, and push notification infrastructure.",
    problems: [
      { heading: "Separate iOS and Android teams are expensive", body: "A unified React Native codebase gives you both platforms at a fraction of the cost, with full access to native APIs." },
      { heading: "App feels slow or drops frames", body: "We profile every critical interaction and eliminate UI thread blocking to deliver smooth 60fps transitions." },
      { heading: "No offline capability", body: "Connectivity is unreliable. We architect offline-first with local SQLite or Realm storage and intelligent sync logic." },
    ],
    deliverables: [
      "iOS + Android apps from a single React Native codebase",
      "Push notification integration (FCM + APNs)",
      "Offline-first local storage and sync layer",
      "App Store and Play Store submission package",
      "Deep link configuration",
      "Analytics and crash reporting integration",
      "CI/CD pipeline for both platforms",
    ],
    capabilities: [
      { label: "Framework", items: ["React Native", "Expo", "TypeScript"] },
      { label: "Storage", items: ["SQLite", "Realm", "AsyncStorage", "MMKV"] },
      { label: "Backend", items: ["REST / GraphQL", "Firebase", "Supabase", "Custom Node.js API"] },
    ],
    stack: ["React Native", "Expo", "TypeScript", "SQLite", "Firebase", "Node.js"],
    approach: [
      { step: "UX Planning", desc: "We map critical user journeys and identify offline-critical flows before design begins." },
      { step: "Architecture", desc: "State management, navigation stack, storage layer, and API contract designed upfront." },
      { step: "Development", desc: "Features shipped to TestFlight and internal Play Store tracks every two weeks." },
      { step: "Device Testing", desc: "Tested on real iOS and Android devices across screen sizes and OS versions." },
      { step: "Store Submission", desc: "We prepare and submit the App Store and Play Store listings." },
      { step: "Post-launch", desc: "OTA updates via Expo EAS, crash monitoring via Sentry, ongoing feature support." },
    ],
    relatedProjects: [
      { name: "TuneBox", kind: "Music Streaming App" },
      { name: "EduCart", kind: "E-Learning Platform" },
    ],
    faq: [
      { q: "Is React Native really production-grade?", a: "Yes. Shopify, Discord, and Meta use React Native for critical consumer apps. With proper architecture it is indistinguishable from native." },
      { q: "Can you submit to both App Store and Play Store?", a: "Yes. We handle the full submission process including screenshots, descriptions, and compliance review." },
      { q: "Do you build the API the app talks to?", a: "Yes. We can build and deploy the complete backend API as part of the same engagement." },
    ],
    relatedIndustries: [
      { label: "E-commerce", slug: "ecommerce" },
      { label: "Healthcare", slug: "healthcare" },
      { label: "Logistics", slug: "logistics" },
    ],
    image: "/detail/services/mobile-development.webp",
    imageAlt: "Cross-platform mobile app screens for iOS and Android built by Zeploy Tech",
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    tagline: "Multi-tenant SaaS platforms with billing, auth, and admin out of the box.",
    meta: {
      title: "SaaS Development | Zeploy Tech",
      description: "Zeploy builds production-ready multi-tenant SaaS platforms with Stripe billing, RBAC auth, usage metering, and admin infrastructure.",
      canonical: "https://www.zeploy.tech/services/saas-development",
    },
    overview: "SaaS is not just a product — it is an infrastructure problem. We build multi-tenant platforms with isolated data layers, role-based access control, usage metering, and Stripe billing integrated from the start. Our SaaS foundations eliminate months of scaffolding work so you can ship to customers faster.",
    problems: [
      { heading: "Building auth and billing from scratch takes months", body: "We ship production-grade auth (SSO, MFA, RBAC) and Stripe billing integrated into your product from day one." },
      { heading: "Tenant data isolation is complex to get right", body: "We design multi-tenant architecture with proper row-level security and schema isolation strategies from the start." },
      { heading: "Admin tooling is always an afterthought", body: "Every SaaS we build includes a first-class admin dashboard covering tenant management, usage analytics, and support tools." },
    ],
    deliverables: [
      "Multi-tenant architecture with data isolation",
      "Stripe billing with subscription tiers and metering",
      "Auth: SSO, OAuth, MFA, RBAC permission system",
      "Admin dashboard with tenant management",
      "Usage analytics and alerting",
      "Onboarding flow and email system",
      "API for third-party integrations",
    ],
    capabilities: [
      { label: "Auth", items: ["Clerk", "Auth0", "NextAuth", "Custom JWT"] },
      { label: "Billing", items: ["Stripe Subscriptions", "Usage-based billing", "Metered APIs"] },
      { label: "Database", items: ["PostgreSQL RLS", "Row-level security", "Multi-schema tenancy"] },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Clerk", "Vercel", "AWS"],
    approach: [
      { step: "Domain Modeling", desc: "We model tenancy, permissions, and billing logic before touching the database schema." },
      { step: "Auth First", desc: "Authentication and authorization shipped as the first vertical." },
      { step: "Billing Integration", desc: "Stripe integration wired to your pricing model with webhook handlers and retry logic." },
      { step: "Core Product", desc: "Incremental feature delivery to staging with bi-weekly demo calls." },
      { step: "Admin Layer", desc: "Admin dashboard delivered alongside the user product." },
      { step: "Launch", desc: "Production deployment with monitoring, alerting, and runbook documentation." },
    ],
    relatedProjects: [
      { name: "Cortex", kind: "AI SaaS Platform" },
      { name: "NeuralPay", kind: "FinTech SaaS" },
    ],
    faq: [
      { q: "Can you migrate our existing product to multi-tenant?", a: "Yes. We have experience refactoring single-tenant products into proper multi-tenant architectures with zero data loss." },
      { q: "Which billing system do you use?", a: "We default to Stripe, which handles subscriptions, usage metering, invoicing, and tax compliance." },
      { q: "How do you handle data isolation?", a: "We use PostgreSQL Row Level Security (RLS) or schema-per-tenant patterns depending on your scale and compliance requirements." },
    ],
    relatedIndustries: [
      { label: "SaaS & Technology", slug: "saas" },
      { label: "Professional Services", slug: "professional-services" },
      { label: "Startups", slug: "startups" },
    ],
    image: "/detail/services/saas-development.webp",
    imageAlt: "Multi-tenant SaaS platform dashboard with subscription management and analytics built by Zeploy Tech",
  },
  {
    slug: "ai-solutions",
    title: "AI Systems & Automation",
    tagline: "LLM pipelines, retrieval systems, and intelligent workflows in production.",
    meta: {
      title: "AI Solutions & AI Software Development | Zeploy Tech",
      description: "Zeploy builds production AI systems including RAG architectures, LLM pipelines, agent workflows, and AI automation for modern businesses.",
      canonical: "https://www.zeploy.tech/services/ai-solutions",
    },
    overview: "AI is only valuable when it ships reliably. We design, build, and operate AI systems that handle real production traffic — RAG pipelines with retrieval-augmented generation, multi-step agent workflows, LLM fine-tuning pipelines, and AI-powered automation that integrates with your existing systems. We prioritize eval-driven development so you always know what your system is doing.",
    problems: [
      { heading: "Prototype worked but production is unreliable", body: "LLM systems require careful prompt management, fallback chains, and eval frameworks. We build production-grade AI, not demos." },
      { heading: "RAG retrieval quality is poor", body: "Retrieval is where most RAG systems fail. We implement hybrid search, re-ranking, and contextual compression to maximize answer quality." },
      { heading: "No visibility into what the AI is doing", body: "We instrument every AI system with tracing, eval pipelines, and cost monitoring so you can measure and improve over time." },
    ],
    deliverables: [
      "RAG pipeline with vector database and hybrid search",
      "LLM agent orchestration with tool use and memory",
      "Prompt management and version control system",
      "Eval framework with automated test cases",
      "Cost and latency monitoring dashboard",
      "AI API with rate limiting and authentication",
      "Documentation and prompt engineering guide",
    ],
    capabilities: [
      { label: "LLMs", items: ["OpenAI GPT-4o", "Anthropic Claude", "Gemini", "Llama (open source)"] },
      { label: "Retrieval", items: ["Pinecone", "Weaviate", "pgvector", "Qdrant", "Hybrid BM25+Dense"] },
      { label: "Frameworks", items: ["LangChain", "LlamaIndex", "CrewAI", "Custom pipelines"] },
    ],
    stack: ["Python", "FastAPI", "OpenAI", "LangChain", "Pinecone", "PostgreSQL", "Redis", "Docker"],
    approach: [
      { step: "Problem Framing", desc: "We identify exactly where AI adds value vs. where deterministic logic is more reliable." },
      { step: "Data Audit", desc: "We audit your data sources, quality, and retrieval requirements before building anything." },
      { step: "Prototype + Eval", desc: "A functional prototype with an eval set is built and measured before any production commitment." },
      { step: "Production Pipeline", desc: "Scalable inference pipeline with caching, fallbacks, and cost controls." },
      { step: "Monitoring", desc: "Tracing, logging, and automated eval runs on every deployment." },
      { step: "Iteration", desc: "Monthly eval reviews with prompt and retrieval improvements based on real usage." },
    ],
    relatedProjects: [
      { name: "MockAI", kind: "AI Interview Evaluation" },
      { name: "Cortex", kind: "AI SaaS Platform" },
    ],
    faq: [
      { q: "Can you fine-tune a model on our proprietary data?", a: "Yes. We can fine-tune open-source models or use OpenAI fine-tuning for specific task adaptation. We also evaluate whether RAG is a better fit than fine-tuning for your use case." },
      { q: "How do you prevent hallucinations?", a: "We use grounding strategies (RAG with citations), structured output parsing, and eval pipelines that flag factual inconsistencies before they reach users." },
      { q: "What does AI automation look like in practice?", a: "Examples include: document processing pipelines, email triage agents, code review assistants, customer support automation, and data extraction workflows." },
    ],
    relatedIndustries: [
      { label: "Healthcare", slug: "healthcare" },
      { label: "Finance & FinTech", slug: "fintech" },
      { label: "Professional Services", slug: "professional-services" },
    ],
    image: "/detail/services/ai-solutions.webp",
    imageAlt: "AI system architecture showing RAG pipeline, vector database, and LLM inference monitoring built by Zeploy Tech",
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    tagline: "AWS-native infrastructure, IaC, and CI/CD for zero-downtime deployment.",
    meta: {
      title: "Cloud Solutions & Infrastructure | Zeploy Tech",
      description: "Zeploy architects and operates AWS and GCP cloud infrastructure with Terraform IaC, Kubernetes, and CI/CD for zero-downtime production systems.",
      canonical: "https://www.zeploy.tech/services/cloud-solutions",
    },
    overview: "Modern software runs on cloud infrastructure that needs to be reliable, observable, and cost-efficient. We architect AWS and GCP environments using infrastructure-as-code, implement CI/CD pipelines that enable daily deployments, and establish observability stacks that give your engineering team visibility into every layer of the system.",
    problems: [
      { heading: "Deployments require manual steps and carry risk", body: "We implement fully automated CI/CD with rollback capabilities, blue/green deployments, and automated smoke tests." },
      { heading: "Cloud bills are unpredictable and growing", body: "We audit your infrastructure for waste, right-size compute, and implement cost alerts before bills surprise you." },
      { heading: "No visibility into system health", body: "We deploy full observability stacks with metrics, logs, distributed traces, and alerting that fires before customers notice problems." },
    ],
    deliverables: [
      "AWS / GCP infrastructure designed with Terraform IaC",
      "Kubernetes cluster setup and workload configuration",
      "CI/CD pipelines (GitHub Actions / GitLab CI)",
      "Monitoring stack (Prometheus, Grafana, Datadog, or CloudWatch)",
      "Log aggregation and distributed tracing",
      "Cost optimization audit and recommendations",
      "Disaster recovery playbook and runbooks",
    ],
    capabilities: [
      { label: "Cloud", items: ["AWS", "GCP", "Vercel", "Cloudflare"] },
      { label: "Infrastructure", items: ["Terraform", "Kubernetes", "Docker", "Helm"] },
      { label: "Observability", items: ["Prometheus", "Grafana", "Datadog", "Sentry"] },
    ],
    stack: ["AWS", "GCP", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "Prometheus", "Grafana"],
    approach: [
      { step: "Audit", desc: "We assess your current infrastructure, deployments, and gaps in observability and security." },
      { step: "Architecture Design", desc: "Network topology, compute sizing, and deployment strategy documented before provisioning." },
      { step: "IaC Implementation", desc: "All infrastructure provisioned as Terraform modules — nothing is click-ops." },
      { step: "CI/CD Setup", desc: "Automated pipelines with environment promotion, rollback, and approval gates." },
      { step: "Observability", desc: "Metrics, logs, and traces deployed across all services with alerting configured." },
      { step: "Documentation", desc: "Runbooks, architecture diagrams, and on-call procedures delivered with the system." },
    ],
    relatedProjects: [
      { name: "Cortex", kind: "AI SaaS Platform" },
      { name: "NeuralPay", kind: "FinTech Platform" },
    ],
    faq: [
      { q: "Do you manage infrastructure on an ongoing basis?", a: "Yes. We offer DevOps retainers covering infrastructure maintenance, cost optimization, security patching, and incident response." },
      { q: "Can you migrate from an existing hosting provider?", a: "Yes. We have migrated systems from Heroku, DigitalOcean, Railway, and bare metal servers to AWS and GCP without downtime." },
      { q: "Is Kubernetes necessary for my project?", a: "Not always. We recommend Kubernetes for microservices or high-traffic systems. For smaller products, simpler setups like ECS Fargate or Vercel reduce operational overhead." },
    ],
    relatedIndustries: [
      { label: "SaaS & Technology", slug: "saas" },
      { label: "Finance & FinTech", slug: "fintech" },
      { label: "Logistics", slug: "logistics" },
    ],
    image: "/detail/services/cloud-solutions.webp",
    imageAlt: "Cloud infrastructure architecture diagram showing AWS services and Kubernetes cluster built by Zeploy Tech",
  },
  {
    slug: "startup-mvp",
    title: "Startup MVP Development",
    tagline: "Ship a defensible v1 in weeks — architected to survive product-market fit.",
    meta: {
      title: "Startup MVP Development | Zeploy Tech",
      description: "Zeploy builds investor-ready startup MVPs in 6-10 weeks — scoped to validate your hypothesis without accumulating technical debt.",
      canonical: "https://www.zeploy.tech/services/startup-mvp",
    },
    overview: "Most MVPs fail not because the idea was wrong but because the technology was unscalable or the scope was too wide. We scope precisely, build for the core hypothesis, and deliver architectures that can grow into a real product — not a prototype that needs to be thrown away after the seed round.",
    problems: [
      { heading: "Agencies build MVPs that become technical debt", body: "We architect for future scale. Your v1 codebase will survive product-market fit without a full rewrite." },
      { heading: "Scope creep kills MVP timelines", body: "We facilitate a structured scope session to identify the single core value proposition and ruthlessly cut everything else." },
      { heading: "Investors need to see production-quality execution", body: "We deliver investor-ready products: clean UI, real data, working authentication, and a live deployment — not a prototype." },
    ],
    deliverables: [
      "Scoped MVP delivered in 6-10 weeks",
      "Landing page + core product workflow",
      "Authentication and user management",
      "Live production deployment",
      "Analytics integration",
      "Performance-optimized frontend",
      "Full codebase handover",
    ],
    capabilities: [
      { label: "Speed Stack", items: ["Next.js / TanStack", "Supabase / PlanetScale", "Vercel"] },
      { label: "Auth", items: ["Clerk", "NextAuth", "Supabase Auth"] },
      { label: "Payments", items: ["Stripe", "Lemon Squeezy"] },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Clerk", "Vercel", "Tailwind CSS"],
    approach: [
      { step: "Scope Session", desc: "2-hour session to identify the one core user action the MVP must validate." },
      { step: "Week 1-2", desc: "Architecture, data model, auth, and core layout completed." },
      { step: "Week 3-6", desc: "Core feature vertical shipped to staging. Daily async updates." },
      { step: "Week 7-8", desc: "Polish, performance, analytics, and user testing." },
      { step: "Week 9-10", desc: "Production deployment, domain setup, and final handover." },
    ],
    relatedProjects: [
      { name: "SynthWave", kind: "Music Production Platform" },
      { name: "Oh My Fries", kind: "Food & Restaurant Platform" },
      { name: "FrameGrill", kind: "Media Platform" },
    ],
    faq: [
      { q: "Can the MVP scale after launch?", a: "Yes. We architect with a scalable foundation — proper auth, a real database, and a deployment pipeline. You can grow on top of it without a rewrite." },
      { q: "What is included in the scope session?", a: "We map user personas, core jobs-to-be-done, the critical path, and cut everything that is not essential to validating the hypothesis." },
      { q: "Do you help with pitch decks or investor materials?", a: "We can provide technical architecture diagrams and system documentation that support investor conversations." },
    ],
    relatedIndustries: [
      { label: "Startups", slug: "startups" },
      { label: "SaaS & Technology", slug: "saas" },
      { label: "E-commerce", slug: "ecommerce" },
    ],
    image: "/detail/services/startup-mvp.webp",
    imageAlt: "Startup MVP product dashboard showing investor-ready interface with analytics and product workflow built by Zeploy Tech",
  },
];

export const servicesBySlug = Object.fromEntries(services.map(s => [s.slug, s]));
