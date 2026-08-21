import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const services = [
  {
    slug: 'web-development',
    title: 'Web Applications',
    subtitle: 'High-Performance Edge-Rendered Platforms',
    tag: 'Next.js · TypeScript · Edge SSR',
    accent: '#3B82F6',
    metrics: [
      { label: 'P95 Latency', value: '42ms' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Edge Availability', value: '99.99%' },
    ],
    panelContent: `
      <!-- Code &amp; Architecture Window -->
      <g transform="translate(80, 160)">
        <rect width="680" height="420" rx="16" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <circle cx="28" cy="24" r="6" fill="#EF4444" opacity="0.8"/>
        <circle cx="48" cy="24" r="6" fill="#F59E0B" opacity="0.8"/>
        <circle cx="68" cy="24" r="6" fill="#10B981" opacity="0.8"/>
        <text x="100" y="28" font-family="monospace" font-size="12" fill="#AFD2FA">app/api/edge/route.ts</text>
        <line x1="0" y1="44" x2="680" y2="44" stroke="rgba(255,255,255,0.08)"/>
        
        <text x="32" y="80" font-family="monospace" font-size="14" fill="#3B82F6">export const</text>
        <text x="135" y="80" font-family="monospace" font-size="14" fill="#FFFFFF">runtime = 'edge';</text>
        
        <text x="32" y="115" font-family="monospace" font-size="14" fill="#3B82F6">export async function</text>
        <text x="210" y="115" font-family="monospace" font-size="14" fill="#60A5FA">GET</text>
        <text x="240" y="115" font-family="monospace" font-size="14" fill="#FFFFFF">(req: Request) {</text>
        
        <text x="64" y="150" font-family="monospace" font-size="14" fill="#AFD2FA">const { searchParams } = new URL(req.url);</text>
        <text x="64" y="185" font-family="monospace" font-size="14" fill="#3B82F6">const</text>
        <text x="110" y="185" font-family="monospace" font-size="14" fill="#FFFFFF">data = await queryCluster(searchParams);</text>
        <text x="64" y="220" font-family="monospace" font-size="14" fill="#10B981">return</text>
        <text x="120" y="220" font-family="monospace" font-size="14" fill="#FFFFFF">Response.json(data, {</text>
        <text x="96" y="255" font-family="monospace" font-size="14" fill="#AFD2FA">headers: { 'Cache-Control': 's-maxage=3600' }</text>
        <text x="64" y="290" font-family="monospace" font-size="14" fill="#FFFFFF">});</text>
        <text x="32" y="325" font-family="monospace" font-size="14" fill="#FFFFFF">}</text>

        <!-- Status Tag -->
        <rect x="32" y="360" width="220" height="34" rx="8" fill="rgba(16,185,129,0.15)" stroke="#10B981" stroke-width="1"/>
        <circle cx="50" cy="377" r="4" fill="#10B981"/>
        <text x="64" y="382" font-family="monospace" font-size="12" fill="#10B981" font-weight="bold">SSR Live · 0.04s render</text>
      </g>

      <!-- Dashboard Component Cards -->
      <g transform="translate(800, 160)">
        <rect width="640" height="420" rx="16" fill="#182350" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
        <text x="32" y="44" font-family="sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF">System Performance Overview</text>
        <text x="32" y="68" font-family="sans-serif" font-size="12" fill="#AFD2FA">Real-time telemetry across 18 edge locations</text>
        
        <!-- Throughput Chart -->
        <path d="M 32 240 Q 120 180, 200 210 T 380 140 T 520 170 T 600 110" fill="none" stroke="#3B82F6" stroke-width="3"/>
        <path d="M 32 240 Q 120 180, 200 210 T 380 140 T 520 170 T 600 110 L 600 300 L 32 300 Z" fill="url(#blueGlow)" opacity="0.2"/>

        <line x1="32" y1="300" x2="600" y2="300" stroke="rgba(255,255,255,0.1)"/>
        
        <!-- Stat Chips -->
        <rect x="32" y="330" width="160" height="60" rx="10" fill="#111A3E" stroke="rgba(59,130,246,0.3)"/>
        <text x="48" y="352" font-family="sans-serif" font-size="10" fill="#AFD2FA" text-transform="uppercase">Total Requests</text>
        <text x="48" y="376" font-family="sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF">14.8M / mo</text>

        <rect x="210" y="330" width="160" height="60" rx="10" fill="#111A3E" stroke="rgba(59,130,246,0.3)"/>
        <text x="226" y="352" font-family="sans-serif" font-size="10" fill="#AFD2FA" text-transform="uppercase">Global TTFB</text>
        <text x="226" y="376" font-family="sans-serif" font-size="18" font-weight="bold" fill="#10B981">38ms</text>

        <rect x="388" y="330" width="180" height="60" rx="10" fill="#111A3E" stroke="rgba(59,130,246,0.3)"/>
        <text x="404" y="352" font-family="sans-serif" font-size="10" fill="#AFD2FA" text-transform="uppercase">Deployment</text>
        <text x="404" y="376" font-family="sans-serif" font-size="18" font-weight="bold" fill="#60A5FA">Zero Downtime</text>
      </g>
    `,
  },
  {
    slug: 'mobile-development',
    title: 'Mobile Apps',
    subtitle: 'Unified Cross-Platform iOS &amp; Android Systems',
    tag: 'React Native · Offline-First · 60 FPS',
    accent: '#3B82F6',
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Offline Sync', value: 'Instant' },
      { label: 'Code Sharing', value: '92%' },
    ],
    panelContent: `
      <!-- Mobile Mockup 1: iOS -->
      <g transform="translate(240, 150)">
        <rect width="320" height="580" rx="40" fill="#111A3E" stroke="rgba(59,130,246,0.4)" stroke-width="3"/>
        <rect x="110" y="16" width="100" height="20" rx="10" fill="#0B1535"/>
        
        <!-- App UI -->
        <rect x="24" y="56" width="272" height="64" rx="12" fill="#182350"/>
        <circle cx="56" cy="88" r="16" fill="#3B82F6"/>
        <text x="84" y="84" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Zeploy Mobile</text>
        <text x="84" y="100" font-family="sans-serif" font-size="10" fill="#AFD2FA">Unified Core Engine</text>

        <!-- Stats Card -->
        <rect x="24" y="136" width="272" height="140" rx="16" fill="#1F2B5B" stroke="rgba(255,255,255,0.1)"/>
        <text x="44" y="168" font-family="sans-serif" font-size="12" fill="#AFD2FA">Sync Status</text>
        <text x="44" y="196" font-family="sans-serif" font-size="22" font-weight="bold" fill="#10B981">Synchronized</text>
        <rect x="44" y="216" width="232" height="8" rx="4" fill="#0B1535"/>
        <rect x="44" y="216" width="190" height="8" rx="4" fill="#3B82F6"/>

        <rect x="24" y="292" width="272" height="240" rx="16" fill="#182350"/>
        <text x="44" y="324" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Telemetry Feed</text>
        <circle cx="44" cy="356" r="4" fill="#10B981"/>
        <text x="56" y="360" font-family="sans-serif" font-size="11" fill="#AFD2FA">Push notification delivered</text>
        <circle cx="44" cy="390" r="4" fill="#3B82F6"/>
        <text x="56" y="394" font-family="sans-serif" font-size="11" fill="#AFD2FA">Background delta sync OK</text>
        <circle cx="44" cy="424" r="4" fill="#60A5FA"/>
        <text x="56" y="428" font-family="sans-serif" font-size="11" fill="#AFD2FA">SQLite cache refreshed</text>
      </g>

      <!-- Mobile Mockup 2: Android / Analytics -->
      <g transform="translate(680, 180)">
        <rect width="660" height="480" rx="20" fill="#182350" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
        <text x="36" y="48" font-family="sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF">Mobile Architecture Metrics</text>
        <text x="36" y="74" font-family="sans-serif" font-size="12" fill="#AFD2FA">Native bridge latency &amp; memory footprint</text>
        
        <g transform="translate(36, 110)">
          <rect width="280" height="150" rx="12" fill="#111A3E" stroke="rgba(59,130,246,0.3)"/>
          <text x="24" y="36" font-family="sans-serif" font-size="12" fill="#AFD2FA">Frame Render Time</text>
          <text x="24" y="72" font-family="sans-serif" font-size="32" font-weight="bold" fill="#FFFFFF">16.2ms</text>
          <text x="24" y="102" font-family="sans-serif" font-size="12" fill="#10B981">✓ Consistently 60 FPS</text>
        </g>

        <g transform="translate(340, 110)">
          <rect width="280" height="150" rx="12" fill="#111A3E" stroke="rgba(59,130,246,0.3)"/>
          <text x="24" y="36" font-family="sans-serif" font-size="12" fill="#AFD2FA">Crash-Free Rate</text>
          <text x="24" y="72" font-family="sans-serif" font-size="32" font-weight="bold" fill="#FFFFFF">99.98%</text>
          <text x="24" y="102" font-family="sans-serif" font-size="12" fill="#10B981">✓ Sentry Realtime Tracked</text>
        </g>

        <g transform="translate(36, 280)">
          <rect width="584" height="160" rx="12" fill="#111A3E" stroke="rgba(255,255,255,0.06)"/>
          <text x="24" y="36" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Native Feature Integrations</text>
          <text x="24" y="64" font-family="monospace" font-size="12" fill="#60A5FA">• Biometric Authentication (FaceID / Fingerprint)</text>
          <text x="24" y="90" font-family="monospace" font-size="12" fill="#60A5FA">• Background Geolocation &amp; Geofencing</text>
          <text x="24" y="116" font-family="monospace" font-size="12" fill="#60A5FA">• Secure Hardware Keystore / Keychain Storage</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'saas-development',
    title: 'SaaS Development',
    subtitle: 'Multi-Tenant Subscription &amp; Infrastructure Architecture',
    tag: 'Multi-Tenant · Stripe · RBAC · Admin Engine',
    accent: '#3B82F6',
    metrics: [
      { label: 'Tenant Isolation', value: 'Postgres RLS' },
      { label: 'Billing Engine', value: 'Stripe Met' },
      { label: 'Admin Tooling', value: 'Complete' },
    ],
    panelContent: `
      <!-- Main SaaS Admin Dashboard Window -->
      <g transform="translate(100, 140)">
        <rect width="1400" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        
        <!-- Sidebar -->
        <rect x="0" y="0" width="220" height="540" rx="20" fill="#0B1535"/>
        <circle cx="36" cy="40" r="12" fill="#3B82F6"/>
        <text x="56" y="44" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Zeploy SaaS</text>
        
        <rect x="16" y="80" width="188" height="36" rx="8" fill="#182350"/>
        <text x="36" y="103" font-family="sans-serif" font-size="12" fill="#FFFFFF" font-weight="bold">Overview</text>
        <text x="36" y="145" font-family="sans-serif" font-size="12" fill="#AFD2FA">Tenants (142)</text>
        <text x="36" y="185" font-family="sans-serif" font-size="12" fill="#AFD2FA">Subscriptions</text>
        <text x="36" y="225" font-family="sans-serif" font-size="12" fill="#AFD2FA">Usage Metering</text>
        <text x="36" y="265" font-family="sans-serif" font-size="12" fill="#AFD2FA">RBAC &amp; Roles</text>
        <text x="36" y="305" font-family="sans-serif" font-size="12" fill="#AFD2FA">Audit Logs</text>

        <!-- Main Dashboard View -->
        <!-- KPI Cards -->
        <g transform="translate(250, 40)">
          <rect x="0" y="0" width="260" height="90" rx="12" fill="#182350" stroke="rgba(255,255,255,0.08)"/>
          <text x="20" y="28" font-family="sans-serif" font-size="11" fill="#AFD2FA" text-transform="uppercase">Monthly Recurring Rev</text>
          <text x="20" y="62" font-family="sans-serif" font-size="26" font-weight="bold" fill="#FFFFFF">$84,920</text>
          <text x="170" y="62" font-family="sans-serif" font-size="12" fill="#10B981">+18.4%</text>

          <rect x="280" y="0" width="260" height="90" rx="12" fill="#182350" stroke="rgba(255,255,255,0.08)"/>
          <text x="300" y="28" font-family="sans-serif" font-size="11" fill="#AFD2FA" text-transform="uppercase">Active Organizations</text>
          <text x="300" y="62" font-family="sans-serif" font-size="26" font-weight="bold" fill="#FFFFFF">1,480</text>
          <text x="440" y="62" font-family="sans-serif" font-size="12" fill="#10B981">+9.2%</text>

          <rect x="560" y="0" width="260" height="90" rx="12" fill="#182350" stroke="rgba(255,255,255,0.08)"/>
          <text x="580" y="28" font-family="sans-serif" font-size="11" fill="#AFD2FA" text-transform="uppercase">API Invocations</text>
          <text x="580" y="62" font-family="sans-serif" font-size="26" font-weight="bold" fill="#60A5FA">48.2M</text>
          <text x="730" y="62" font-family="sans-serif" font-size="12" fill="#10B981">Nominal</text>
        </g>

        <!-- Chart Area -->
        <g transform="translate(250, 160)">
          <rect width="540" height="340" rx="14" fill="#182350" stroke="rgba(255,255,255,0.08)"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Revenue &amp; Usage Growth</text>
          <path d="M 24 260 Q 120 220, 200 180 T 360 140 T 480 80" fill="none" stroke="#3B82F6" stroke-width="4"/>
          <circle cx="480" cy="80" r="6" fill="#60A5FA"/>
        </g>

        <!-- Tenant List -->
        <g transform="translate(810, 160)">
          <rect width="550" height="340" rx="14" fill="#182350" stroke="rgba(255,255,255,0.08)"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Live Organization Tenants</text>
          
          <rect x="24" y="60" width="502" height="50" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Acme Corporation</text>
          <text x="320" y="90" font-family="monospace" font-size="11" fill="#10B981">Enterprise Plan · $2.4k/mo</text>

          <rect x="24" y="120" width="502" height="50" rx="8" fill="#111A3E"/>
          <text x="40" y="150" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Nexus Global Inc</text>
          <text x="320" y="150" font-family="monospace" font-size="11" fill="#10B981">Growth Tier · $890/mo</text>

          <rect x="24" y="180" width="502" height="50" rx="8" fill="#111A3E"/>
          <text x="40" y="210" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Vertex Labs LLC</text>
          <text x="320" y="210" font-family="monospace" font-size="11" fill="#3B82F6">Startup Tier · $290/mo</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'ai-solutions',
    title: 'AI Systems &amp; Automation',
    subtitle: 'Production LLM Pipelines, RAG Architectures &amp; Agent Workflows',
    tag: 'RAG · Embeddings · Vector DB · LLM Orchestration',
    accent: '#3B82F6',
    metrics: [
      { label: 'Inference Latency', value: '180ms' },
      { label: 'Retrieval Quality', value: '96.4%' },
      { label: 'Eval Pass Rate', value: '99.1%' },
    ],
    panelContent: `
      <g transform="translate(80, 140)">
        <!-- Architecture Flow -->
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Production AI &amp; RAG Pipeline</text>
        <text x="40" y="78" font-family="sans-serif" font-size="13" fill="#AFD2FA">Hybrid dense + sparse retrieval with real-time hallucination evaluation</text>

        <!-- Pipeline Step 1: Input Query -->
        <g transform="translate(40, 120)">
          <rect width="260" height="360" rx="14" fill="#182350" stroke="rgba(255,255,255,0.1)"/>
          <rect x="20" y="20" width="100" height="24" rx="6" fill="#3B82F6"/>
          <text x="32" y="36" font-family="sans-serif" font-size="11" fill="#FFFFFF" font-weight="bold">Step 1: Ingest</text>
          <text x="20" y="80" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">User Query &amp; Context</text>
          <text x="20" y="110" font-family="sans-serif" font-size="12" fill="#AFD2FA">Natural language prompt tokenized and parsed for semantic intent.</text>
          
          <rect x="20" y="160" width="220" height="80" rx="8" fill="#111A3E"/>
          <text x="32" y="185" font-family="monospace" font-size="10" fill="#AFD2FA">Tokens: 42</text>
          <text x="32" y="205" font-family="monospace" font-size="10" fill="#10B981">Intent: Analytical RAG</text>
          <text x="32" y="225" font-family="monospace" font-size="10" fill="#60A5FA">Security: Sanitized ✓</text>
        </g>

        <!-- Arrow 1 -->
        <path d="M 310 300 L 370 300" stroke="#3B82F6" stroke-width="3" marker-end="url(#arrow)"/>

        <!-- Pipeline Step 2: Vector Search -->
        <g transform="translate(380, 120)">
          <rect width="280" height="360" rx="14" fill="#182350" stroke="rgba(59,130,246,0.4)"/>
          <rect x="20" y="20" width="120" height="24" rx="6" fill="#2563EB"/>
          <text x="30" y="36" font-family="sans-serif" font-size="11" fill="#FFFFFF" font-weight="bold">Step 2: Retrieval</text>
          <text x="20" y="80" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Hybrid Vector Search</text>
          <text x="20" y="110" font-family="sans-serif" font-size="12" fill="#AFD2FA">Pinecone / pgvector embedding search + BM25 keyword re-ranking.</text>
          
          <rect x="20" y="160" width="240" height="160" rx="8" fill="#111A3E"/>
          <text x="32" y="185" font-family="monospace" font-size="11" fill="#FFFFFF">Top 5 Context Chunks:</text>
          <text x="32" y="210" font-family="monospace" font-size="10" fill="#10B981">Chunk 01 (Score 0.98)</text>
          <text x="32" y="235" font-family="monospace" font-size="10" fill="#10B981">Chunk 02 (Score 0.94)</text>
          <text x="32" y="260" font-family="monospace" font-size="10" fill="#10B981">Chunk 03 (Score 0.91)</text>
          <text x="32" y="295" font-family="monospace" font-size="10" fill="#AFD2FA">Latency: 28ms</text>
        </g>

        <!-- Arrow 2 -->
        <path d="M 670 300 L 730 300" stroke="#3B82F6" stroke-width="3"/>

        <!-- Pipeline Step 3: LLM Inference -->
        <g transform="translate(740, 120)">
          <rect width="320" height="360" rx="14" fill="#182350" stroke="rgba(59,130,246,0.4)"/>
          <rect x="20" y="20" width="130" height="24" rx="6" fill="#3B82F6"/>
          <text x="30" y="36" font-family="sans-serif" font-size="11" fill="#FFFFFF" font-weight="bold">Step 3: Synthesis</text>
          <text x="20" y="80" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">LLM Inference &amp; Eval</text>
          <text x="20" y="110" font-family="sans-serif" font-size="12" fill="#AFD2FA">Grounded generation with citation verification and guardrails.</text>
          
          <rect x="20" y="160" width="280" height="160" rx="8" fill="#111A3E"/>
          <text x="32" y="185" font-family="monospace" font-size="11" fill="#10B981">Grounding Check: PASS</text>
          <text x="32" y="210" font-family="monospace" font-size="11" fill="#10B981">Hallucination Risk: 0.02%</text>
          <text x="32" y="235" font-family="monospace" font-size="11" fill="#AFD2FA">Stream Speed: 84 tok/s</text>
          <text x="32" y="260" font-family="monospace" font-size="11" fill="#60A5FA">Output Tokens: 340</text>
        </g>

        <!-- Step 4: Observability Card -->
        <g transform="translate(1090, 120)">
          <rect width="310" height="360" rx="14" fill="#1F2B5B" stroke="rgba(255,255,255,0.1)"/>
          <text x="24" y="44" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Continuous Eval</text>
          
          <rect x="20" y="70" width="270" height="70" rx="8" fill="#111A3E"/>
          <text x="32" y="95" font-family="sans-serif" font-size="10" fill="#AFD2FA">Cost Per 1k Queries</text>
          <text x="32" y="125" font-family="sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF">$0.42</text>

          <rect x="20" y="155" width="270" height="70" rx="8" fill="#111A3E"/>
          <text x="32" y="180" font-family="sans-serif" font-size="10" fill="#AFD2FA">Faithfulness Eval</text>
          <text x="32" y="210" font-family="sans-serif" font-size="20" font-weight="bold" fill="#10B981">99.4%</text>

          <rect x="20" y="240" width="270" height="90" rx="8" fill="#111A3E"/>
          <text x="32" y="265" font-family="sans-serif" font-size="10" fill="#AFD2FA">Guardrail Status</text>
          <text x="32" y="295" font-family="sans-serif" font-size="14" font-weight="bold" fill="#60A5FA">Active · 0 Violations</text>
        </g>
      </g>
    `,
  },

  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    subtitle: 'AWS &amp; GCP Terraform IaC, Kubernetes &amp; High-Availability Operations',
    tag: 'Terraform · Kubernetes · CI/CD · Zero-Downtime',
    accent: '#3B82F6',
    metrics: [
      { label: 'Uptime (90d)', value: '99.99%' },
      { label: 'Deploy Time', value: '4m 12s' },
      { label: 'IaC Coverage', value: '100%' },
    ],
    panelContent: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="48" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Cloud Infrastructure Topology</text>
        <text x="40" y="74" font-family="sans-serif" font-size="13" fill="#AFD2FA">Multi-region Kubernetes &amp; Terraform automated infrastructure</text>

        <!-- Topology Nodes -->
        <g transform="translate(40, 120)">
          <!-- Node 1: Cloudflare Edge -->
          <rect x="0" y="80" width="240" height="160" rx="14" fill="#182350" stroke="rgba(255,255,255,0.1)"/>
          <text x="24" y="115" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Global Edge Layer</text>
          <text x="24" y="140" font-family="sans-serif" font-size="11" fill="#AFD2FA">Cloudflare WAF + DDoS</text>
          <text x="24" y="170" font-family="monospace" font-size="11" fill="#10B981">• SSL / TLS 1.3 Term</text>
          <text x="24" y="195" font-family="monospace" font-size="11" fill="#10B981">• Edge Caching Active</text>

          <!-- Node 2: K8s Cluster -->
          <rect x="320" y="30" width="340" height="260" rx="14" fill="#182350" stroke="rgba(59,130,246,0.4)" stroke-width="2"/>
          <text x="344" y="65" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Kubernetes Cluster (EKS)</text>
          <text x="344" y="90" font-family="sans-serif" font-size="11" fill="#AFD2FA">Auto-scaling Node Groups (us-east-1)</text>
          
          <rect x="344" y="115" width="292" height="45" rx="8" fill="#111A3E"/>
          <text x="360" y="142" font-family="monospace" font-size="12" fill="#60A5FA">Pod: api-server (12 replicas)</text>

          <rect x="344" y="170" width="292" height="45" rx="8" fill="#111A3E"/>
          <text x="360" y="197" font-family="monospace" font-size="12" fill="#60A5FA">Pod: worker-queue (6 replicas)</text>

          <rect x="344" y="225" width="292" height="45" rx="8" fill="#111A3E"/>
          <text x="360" y="252" font-family="monospace" font-size="12" fill="#10B981">HPA: CPU @ 38% (Nominal)</text>

          <!-- Node 3: Database &amp; Cache -->
          <rect x="740" y="80" width="300" height="160" rx="14" fill="#182350" stroke="rgba(255,255,255,0.1)"/>
          <text x="764" y="115" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Managed Data Tier</text>
          <text x="764" y="140" font-family="sans-serif" font-size="11" fill="#AFD2FA">PostgreSQL Multi-AZ + Redis</text>
          <text x="764" y="170" font-family="monospace" font-size="11" fill="#10B981">• Automated Failover: &lt;15s</text>
          <text x="764" y="195" font-family="monospace" font-size="11" fill="#10B981">• PITR Backups Enabled</text>

          <!-- Node 4: CI/CD Pipeline Summary -->
          <rect x="1080" y="30" width="320" height="260" rx="14" fill="#1F2B5B" stroke="rgba(255,255,255,0.1)"/>
          <text x="1104" y="65" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">CI/CD Pipeline Status</text>
          <text x="1104" y="90" font-family="sans-serif" font-size="11" fill="#AFD2FA">GitHub Actions → Terraform Plan</text>
          
          <rect x="1104" y="115" width="272" height="40" rx="8" fill="#111A3E"/>
          <text x="1120" y="140" font-family="monospace" font-size="11" fill="#10B981">✓ Build &amp; Lint Passed</text>

          <rect x="1104" y="165" width="272" height="40" rx="8" fill="#111A3E"/>
          <text x="1120" y="190" font-family="monospace" font-size="11" fill="#10B981">✓ Integration Tests Passed</text>

          <rect x="1104" y="215" width="272" height="40" rx="8" fill="#111A3E"/>
          <text x="1120" y="240" font-family="monospace" font-size="11" fill="#3B82F6">✓ Terraform Deployed (0 drift)</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'startup-mvp',
    title: 'Startup MVP Development',
    subtitle: 'From Concept to Investor-Ready Launch in 6–10 Weeks',
    tag: 'Rapid Prototyping · Scalable V1 · Investor-Ready',
    accent: '#3B82F6',
    metrics: [
      { label: 'Time to Market', value: '6–10 Wks' },
      { label: 'Seed Validation', value: '100%' },
      { label: 'Scales to V2', value: 'Yes' },
    ],
    panelContent: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="48" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">MVP Launch Roadmap &amp; Velocity</text>
        <text x="40" y="74" font-family="sans-serif" font-size="13" fill="#AFD2FA">Structured 8-week timeline to product-market fit validation</text>

        <!-- Sprint Timeline Cards -->
        <g transform="translate(40, 110)">
          <!-- Sprint 1 -->
          <rect x="0" y="0" width="310" height="380" rx="14" fill="#182350" stroke="rgba(255,255,255,0.08)"/>
          <rect x="20" y="20" width="100" height="24" rx="6" fill="#3B82F6"/>
          <text x="30" y="36" font-family="sans-serif" font-size="11" fill="#FFFFFF" font-weight="bold">Weeks 1–2</text>
          <text x="20" y="75" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Architecture &amp; Auth</text>
          <text x="20" y="100" font-family="sans-serif" font-size="12" fill="#AFD2FA">Core schema modeling, authentication integration, and design token system.</text>
          <rect x="20" y="140" width="270" height="180" rx="8" fill="#111A3E"/>
          <text x="36" y="170" font-family="monospace" font-size="11" fill="#10B981">✓ Postgres Schema</text>
          <text x="36" y="200" font-family="monospace" font-size="11" fill="#10B981">✓ Auth &amp; Session Mgmt</text>
          <text x="36" y="230" font-family="monospace" font-size="11" fill="#10B981">✓ Responsive Shell</text>
          <text x="36" y="260" font-family="monospace" font-size="11" fill="#10B981">✓ CI/CD Pipeline</text>
        </g>

        <g transform="translate(380, 110)">
          <!-- Sprint 2 -->
          <rect x="0" y="0" width="310" height="380" rx="14" fill="#182350" stroke="rgba(59,130,246,0.4)" stroke-width="2"/>
          <rect x="20" y="20" width="100" height="24" rx="6" fill="#2563EB"/>
          <text x="30" y="36" font-family="sans-serif" font-size="11" fill="#FFFFFF" font-weight="bold">Weeks 3–6</text>
          <text x="20" y="75" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Core Feature Engine</text>
          <text x="20" y="100" font-family="sans-serif" font-size="12" fill="#AFD2FA">Building the primary user vertical with bi-weekly demo deployments.</text>
          <rect x="20" y="140" width="270" height="180" rx="8" fill="#111A3E"/>
          <text x="36" y="170" font-family="monospace" font-size="11" fill="#60A5FA">→ Primary Workflow</text>
          <text x="36" y="200" font-family="monospace" font-size="11" fill="#60A5FA">→ Stripe Subscriptions</text>
          <text x="36" y="230" font-family="monospace" font-size="11" fill="#60A5FA">→ Analytics Integration</text>
          <text x="36" y="260" font-family="monospace" font-size="11" fill="#60A5FA">→ Staging Live Preview</text>
        </g>

        <g transform="translate(720, 110)">
          <!-- Sprint 3 -->
          <rect x="0" y="0" width="310" height="380" rx="14" fill="#182350" stroke="rgba(255,255,255,0.08)"/>
          <rect x="20" y="20" width="100" height="24" rx="6" fill="#10B981"/>
          <text x="30" y="36" font-family="sans-serif" font-size="11" fill="#FFFFFF" font-weight="bold">Weeks 7–8</text>
          <text x="20" y="75" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">QA, Polish &amp; Launch</text>
          <text x="20" y="100" font-family="sans-serif" font-size="12" fill="#AFD2FA">Performance audit, security verification, custom domain setup, and live launch.</text>
          <rect x="20" y="140" width="270" height="180" rx="8" fill="#111A3E"/>
          <text x="36" y="170" font-family="monospace" font-size="11" fill="#10B981">✓ Security Audit</text>
          <text x="36" y="200" font-family="monospace" font-size="11" fill="#10B981">✓ Lighthouse 95+</text>
          <text x="36" y="230" font-family="monospace" font-size="11" fill="#10B981">✓ Production Rollout</text>
          <text x="36" y="260" font-family="monospace" font-size="11" fill="#10B981">✓ Full Repo Transfer</text>
        </g>

        <g transform="translate(1060, 110)">
          <!-- Investor Ready Summary -->
          <rect x="0" y="0" width="340" height="380" rx="14" fill="#1F2B5B" stroke="rgba(255,255,255,0.1)"/>
          <text x="24" y="44" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Investor Ready Package</text>
          <text x="24" y="70" font-family="sans-serif" font-size="12" fill="#AFD2FA">Deliverables included in every MVP</text>
          
          <rect x="20" y="95" width="300" height="60" rx="8" fill="#111A3E"/>
          <text x="36" y="125" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">Live Production URL</text>
          <text x="36" y="142" font-family="sans-serif" font-size="10" fill="#10B981">Fast global SSL deployment</text>

          <rect x="20" y="165" width="300" height="60" rx="8" fill="#111A3E"/>
          <text x="36" y="195" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">System Architecture Docs</text>
          <text x="36" y="212" font-family="sans-serif" font-size="10" fill="#60A5FA">Ready for investor due diligence</text>

          <rect x="20" y="235" width="300" height="60" rx="8" fill="#111A3E"/>
          <text x="36" y="265" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">Scales to Series A</text>
          <text x="36" y="282" font-family="sans-serif" font-size="10" fill="#10B981">Zero throwaway code</text>
        </g>
      </g>
    `,
  },
];

const industries = [
  {
    slug: 'startups',
    title: 'Startups &amp; Ventures',
    subtitle: 'High-Velocity Venture Engineering &amp; Scalable MVPs',
    tag: 'MVP · Scalability · Product-Market Fit',
    metric1: '6–10 Wks',
    metric1Label: 'Average Launch Time',
    metric2: '$0 Tech Debt',
    metric2Label: 'Clean Architecture',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Startup Engineering Dashboard</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Product metrics, iteration velocity, and user acquisition telemetry</text>
        
        <g transform="translate(40, 110)">
          <rect width="420" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Sprint Velocity &amp; Burndown</text>
          <path d="M 24 300 Q 120 240, 200 180 T 360 80" fill="none" stroke="#3B82F6" stroke-width="4"/>
          <text x="24" y="340" font-family="monospace" font-size="12" fill="#10B981">✓ 100% Sprint Completion Rate</text>
        </g>

        <g transform="translate(490, 110)">
          <rect width="420" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">User Acquisition &amp; Retention</text>
          <rect x="24" y="60" width="372" height="60" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">Day 30 Retention</text>
          <text x="40" y="110" font-family="sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF">48.6% (Top Quartile)</text>

          <rect x="24" y="140" width="372" height="60" rx="8" fill="#111A3E"/>
          <text x="40" y="170" font-family="sans-serif" font-size="12" fill="#AFD2FA">Activation Rate</text>
          <text x="40" y="190" font-family="sans-serif" font-size="18" font-weight="bold" fill="#10B981">72.4%</text>
        </g>

        <g transform="translate(940, 110)">
          <rect width="460" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Venture Readiness Checklist</text>
          <text x="24" y="80" font-family="monospace" font-size="12" fill="#10B981">✓ Security &amp; Auth Hardened</text>
          <text x="24" y="120" font-family="monospace" font-size="12" fill="#10B981">✓ Stripe Subscription Live</text>
          <text x="24" y="160" font-family="monospace" font-size="12" fill="#10B981">✓ Data Pipeline Automated</text>
          <text x="24" y="200" font-family="monospace" font-size="12" fill="#10B981">✓ SOC 2 Type II Preparation</text>
          <text x="24" y="240" font-family="monospace" font-size="12" fill="#10B981">✓ Full IP &amp; Code Handover</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce',
    subtitle: 'High-Conversion Headless Storefronts &amp; Order Systems',
    tag: 'Headless Commerce · High Concurrency · Multi-Warehouse',
    metric1: '99.99%',
    metric1Label: 'Flash Sale Uptime',
    metric2: '+34%',
    metric2Label: 'Checkout Conversion',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Omnichannel Commerce Operations</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Real-time cart conversion, order fulfillment, and multi-warehouse inventory</text>

        <g transform="translate(40, 110)">
          <rect width="430" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Realtime Order Pipeline</text>
          <rect x="24" y="60" width="382" height="50" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#FFFFFF">Order #84920 · $340.00</text>
          <text x="300" y="90" font-family="monospace" font-size="11" fill="#10B981">Paid ✓</text>

          <rect x="24" y="120" width="382" height="50" rx="8" fill="#111A3E"/>
          <text x="40" y="150" font-family="sans-serif" font-size="12" fill="#FFFFFF">Order #84919 · $185.50</text>
          <text x="300" y="150" font-family="monospace" font-size="11" fill="#60A5FA">Shipped ✈</text>
        </g>

        <g transform="translate(500, 110)">
          <rect width="430" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Multi-Warehouse Inventory</text>
          <text x="24" y="80" font-family="sans-serif" font-size="13" fill="#AFD2FA">Warehouse East (NY): 4,200 units</text>
          <text x="24" y="120" font-family="sans-serif" font-size="13" fill="#AFD2FA">Warehouse West (CA): 3,840 units</text>
          <text x="24" y="160" font-family="sans-serif" font-size="13" fill="#AFD2FA">European Hub (NL): 1,920 units</text>
          <rect x="24" y="200" width="382" height="120" rx="8" fill="#111A3E"/>
          <text x="40" y="235" font-family="sans-serif" font-size="13" font-weight="bold" fill="#10B981">Inventory Sync Status: REALTIME</text>
          <text x="40" y="265" font-family="sans-serif" font-size="11" fill="#AFD2FA">Zero overselling protection via Redis locks</text>
        </g>

        <g transform="translate(960, 110)">
          <rect width="440" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Conversion Funnel</text>
          <text x="24" y="80" font-family="sans-serif" font-size="14" fill="#FFFFFF">Product Page View: 100%</text>
          <text x="24" y="120" font-family="sans-serif" font-size="14" fill="#60A5FA">Add to Cart: 38.4%</text>
          <text x="24" y="160" font-family="sans-serif" font-size="14" fill="#3B82F6">Checkout Initiated: 24.1%</text>
          <text x="24" y="200" font-family="sans-serif" font-size="14" font-weight="bold" fill="#10B981">Order Completed: 18.2%</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    subtitle: 'HIPAA-Compliant Patient Management &amp; Telehealth',
    tag: 'HIPAA · FHIR · End-to-End Encryption',
    metric1: '100% HIPAA',
    metric1Label: 'Technical Safeguards',
    metric2: 'AES-256',
    metric2Label: 'Encrypted Records',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Healthcare Portal &amp; Clinical Workflows</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Protected Health Information (PHI) management and encrypted telehealth pipeline</text>
        
        <g transform="translate(40, 110)">
          <rect width="660" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Patient Electronic Health Record (EHR)</text>
          <rect x="24" y="60" width="612" height="60" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Patient ID #84920 · John Doe</text>
          <text x="420" y="90" font-family="monospace" font-size="11" fill="#10B981">Encrypted (AES-256) ✓</text>

          <rect x="24" y="140" width="612" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="170" font-family="monospace" font-size="12" fill="#60A5FA">• HL7 / FHIR Synchronized with Epic EHR</text>
          <text x="40" y="200" font-family="monospace" font-size="12" fill="#60A5FA">• Clinical Vitals Monitored (Heart Rate, BP, SpO2)</text>
          <text x="40" y="230" font-family="monospace" font-size="12" fill="#60A5FA">• Telehealth Session Scheduled: 14:00 EST</text>
          <text x="40" y="260" font-family="monospace" font-size="12" fill="#10B981">• Audit Trail: Verified Zero Data Exposure</text>
        </g>

        <g transform="translate(730, 110)">
          <rect width="670" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Telemedicine &amp; Video Consultation</text>
          <rect x="24" y="60" width="622" height="220" rx="12" fill="#111A3E"/>
          <circle cx="335" cy="150" r="30" fill="#3B82F6"/>
          <text x="335" y="156" font-family="sans-serif" font-size="18" fill="#FFFFFF" text-anchor="middle">▶</text>
          <text x="335" y="210" font-family="sans-serif" font-size="12" fill="#AFD2FA" text-anchor="middle">WebRTC DTLS-SRTP End-to-End Encrypted</text>
          
          <rect x="24" y="300" width="622" height="50" rx="8" fill="#111A3E"/>
          <text x="40" y="330" font-family="sans-serif" font-size="12" fill="#10B981">✓ Business Associate Agreement (BAA) Ready</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'education',
    title: 'Education',
    subtitle: 'Scalable LMS, Adaptive Learning &amp; Automated Grading',
    tag: 'EdTech · LMS · SCORM · Realtime Quizzes',
    metric1: '50k+ Concurrent',
    metric1Label: 'Exam Load Capacity',
    metric2: '40% Higher',
    metric2Label: 'Course Completion',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">EdTech &amp; Learning Management Platform</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Course delivery, real-time assessment scoring, and student progress tracking</text>

        <g transform="translate(40, 110)">
          <rect width="660" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Course Progress &amp; Interactive Modules</text>
          <rect x="24" y="60" width="612" height="80" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Advanced System Architecture</text>
          <text x="40" y="115" font-family="sans-serif" font-size="12" fill="#10B981">8 of 10 Modules Completed (80%)</text>
          
          <rect x="24" y="160" width="612" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="195" font-family="monospace" font-size="12" fill="#60A5FA">• Automated Quiz Grading: Instant Feedback</text>
          <text x="40" y="225" font-family="monospace" font-size="12" fill="#60A5FA">• Live Code Sandbox: Passed 14/14 Unit Tests</text>
          <text x="40" y="255" font-family="monospace" font-size="12" fill="#60A5FA">• SCORM / xAPI Interoperable Record Generated</text>
          <text x="40" y="285" font-family="monospace" font-size="12" fill="#10B981">• Completion Certificate: Verified on Blockchain</text>
        </g>

        <g transform="translate(730, 110)">
          <rect width="670" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Cohort Performance Telemetry</text>
          <rect x="24" y="60" width="622" height="120" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">Active Cohort Students</text>
          <text x="40" y="125" font-family="sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF">12,480</text>
          <text x="220" y="125" font-family="sans-serif" font-size="14" fill="#10B981">+38% YoY</text>

          <rect x="24" y="200" width="622" height="140" rx="8" fill="#111A3E"/>
          <text x="40" y="230" font-family="sans-serif" font-size="12" fill="#AFD2FA">Average Assessment Score</text>
          <text x="40" y="270" font-family="sans-serif" font-size="28" font-weight="bold" fill="#10B981">89.4%</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    subtitle: 'PropTech Marketplaces, Geospatial Search &amp; Tenant Portals',
    tag: 'RESO API · PostGIS · Digital Leases · Automated AVM',
    metric1: '&lt;50ms',
    metric1Label: 'Map Search Latency',
    metric2: '100% Digital',
    metric2Label: 'Lease Processing',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">PropTech &amp; Real Estate Marketplace</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Geospatial listing search, automated valuation models (AVM), and tenant lease portals</text>

        <g transform="translate(40, 110)">
          <rect width="800" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Interactive Geospatial Property Search</text>
          
          <!-- Mock Map -->
          <rect x="24" y="60" width="752" height="280" rx="10" fill="#111A3E"/>
          <circle cx="200" cy="180" r="18" fill="#3B82F6" stroke="#FFFFFF" stroke-width="2"/>
          <text x="200" y="185" font-family="sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">$1.2M</text>

          <circle cx="450" cy="140" r="18" fill="#10B981" stroke="#FFFFFF" stroke-width="2"/>
          <text x="450" y="145" font-family="sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">$890k</text>

          <circle cx="600" cy="240" r="18" fill="#3B82F6" stroke="#FFFFFF" stroke-width="2"/>
          <text x="600" y="245" font-family="sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">$2.4M</text>
        </g>

        <g transform="translate(870, 110)">
          <rect width="530" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Property Valuation &amp; Pipeline</text>
          
          <rect x="24" y="60" width="482" height="80" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">Estimated Property Valuation</text>
          <text x="40" y="120" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">$1,240,000</text>

          <rect x="24" y="160" width="482" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="190" font-family="monospace" font-size="11" fill="#60A5FA">• MLS / RETS Feed Live Synchronized</text>
          <text x="40" y="220" font-family="monospace" font-size="11" fill="#60A5FA">• Online Rent Collection: Stripe ACH</text>
          <text x="40" y="250" font-family="monospace" font-size="11" fill="#60A5FA">• Tenant Lease E-Signed ✓</text>
          <text x="40" y="280" font-family="monospace" font-size="11" fill="#10B981">• Occupancy Rate: 98.4%</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'fintech',
    title: 'Finance &amp; FinTech',
    subtitle: 'Double-Entry Ledgers, High-Volume Payment Routing &amp; Compliance',
    tag: 'Double-Entry · PCI-DSS · KYC/AML · Real-Time Ledger',
    metric1: '0.00%',
    metric1Label: 'Reconciliation Error',
    metric2: 'PCI-DSS',
    metric2Label: 'Security Standard',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">FinTech Payment Engine &amp; Ledger</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Immutable double-entry balance updates, fraud evaluation, and multi-gateway routing</text>

        <g transform="translate(40, 110)">
          <rect width="800" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Live Double-Entry Transaction Ledger</text>
          
          <rect x="24" y="60" width="752" height="50" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="monospace" font-size="12" fill="#FFFFFF">TX-84920 · Debit: User Account ($450.00)</text>
          <text x="480" y="90" font-family="monospace" font-size="12" fill="#10B981">Credit: Settlement ($450.00)</text>

          <rect x="24" y="120" width="752" height="50" rx="8" fill="#111A3E"/>
          <text x="40" y="150" font-family="monospace" font-size="12" fill="#FFFFFF">TX-84919 · Debit: Clearing ($1,200.00)</text>
          <text x="480" y="150" font-family="monospace" font-size="12" fill="#10B981">Credit: Merchant ($1,200.00)</text>

          <rect x="24" y="180" width="752" height="160" rx="8" fill="#111A3E"/>
          <text x="40" y="215" font-family="monospace" font-size="12" fill="#60A5FA">• Idempotency Key Enforced: 100% Duplicate-Proof</text>
          <text x="40" y="245" font-family="monospace" font-size="12" fill="#60A5FA">• Automated End-of-Day Reconciliation: 0 Discrepancy</text>
          <text x="40" y="275" font-family="monospace" font-size="12" fill="#10B981">• Fraud ML Score: 0.01 (Low Risk · Approved)</text>
        </g>

        <g transform="translate(870, 110)">
          <rect width="530" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Gateway Routing Health</text>
          <rect x="24" y="60" width="482" height="80" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">Stripe / Adyen Success Rate</text>
          <text x="40" y="120" font-family="sans-serif" font-size="24" font-weight="bold" fill="#10B981">99.82%</text>

          <rect x="24" y="160" width="482" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="195" font-family="monospace" font-size="11" fill="#60A5FA">• Multi-Currency FX Engine</text>
          <text x="40" y="225" font-family="monospace" font-size="11" fill="#60A5FA">• KYC / AML Automated Screening</text>
          <text x="40" y="255" font-family="monospace" font-size="11" fill="#10B981">• PCI Tokenization Isolated</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'logistics',
    title: 'Logistics &amp; Transportation',
    subtitle: 'Fleet Telematics, Route Optimization &amp; Supply Chain Tracking',
    tag: 'GPS Telematics · Route Optimization · Last-Mile',
    metric1: 'Real-Time',
    metric1Label: 'GPS Telemetry',
    metric2: '-24%',
    metric2Label: 'Fuel Consumption',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Fleet Dispatch &amp; Route Telematics</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Live asset tracking, multi-stop routing solver, and proof-of-delivery sync</text>

        <g transform="translate(40, 110)">
          <rect width="800" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Live Fleet Dispatch Map</text>
          
          <rect x="24" y="60" width="752" height="280" rx="10" fill="#111A3E"/>
          <path d="M 100 200 L 250 140 L 400 220 L 600 100" stroke="#3B82F6" stroke-width="4" stroke-dasharray="6,6"/>
          
          <circle cx="100" cy="200" r="10" fill="#10B981"/>
          <text x="100" y="230" font-family="sans-serif" font-size="11" fill="#FFFFFF" text-anchor="middle">Hub A</text>

          <circle cx="400" cy="220" r="12" fill="#3B82F6"/>
          <text x="400" y="250" font-family="sans-serif" font-size="11" fill="#FFFFFF" text-anchor="middle">Truck #14 · On Route</text>

          <circle cx="600" cy="100" r="10" fill="#60A5FA"/>
          <text x="600" y="130" font-family="sans-serif" font-size="11" fill="#FFFFFF" text-anchor="middle">Delivery Point</text>
        </g>

        <g transform="translate(870, 110)">
          <rect width="530" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Route Efficiency Metrics</text>
          <rect x="24" y="60" width="482" height="80" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">On-Time Delivery Rate</text>
          <text x="40" y="120" font-family="sans-serif" font-size="24" font-weight="bold" fill="#10B981">99.4%</text>

          <rect x="24" y="160" width="482" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="195" font-family="monospace" font-size="11" fill="#60A5FA">• Algorithmic TSP Route Solver</text>
          <text x="40" y="225" font-family="monospace" font-size="11" fill="#60A5FA">• Offline-First Driver Mobile App</text>
          <text x="40" y="255" font-family="monospace" font-size="11" fill="#10B981">• Electronic Signature Capture ✓</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'hospitality',
    title: 'Hospitality',
    subtitle: 'Direct Booking Engine, Contactless Concierge &amp; Multi-Property Ops',
    tag: 'Direct Booking · PMS · Contactless Key · Dynamic RevPAR',
    metric1: '0% OTA Fee',
    metric1Label: 'Direct Bookings',
    metric2: '+28%',
    metric2Label: 'Direct Revenue',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Hospitality Operations &amp; Direct Booking</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Commission-free reservation engine, guest mobile concierge, and channel inventory sync</text>

        <g transform="translate(40, 110)">
          <rect width="700" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Direct Room Booking Engine</text>
          
          <rect x="24" y="60" width="652" height="70" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Penthouse Suite · 3 Nights</text>
          <text x="40" y="112" font-family="sans-serif" font-size="12" fill="#10B981">Aug 24 – Aug 27 · $1,450 Total (0% OTA fee)</text>

          <rect x="24" y="150" width="652" height="190" rx="8" fill="#111A3E"/>
          <text x="40" y="185" font-family="monospace" font-size="12" fill="#60A5FA">• Channel Manager Sync: Booking.com / Airbnb Locked</text>
          <text x="40" y="215" font-family="monospace" font-size="12" fill="#60A5FA">• Dynamic Pricing Engine: RevPAR Optimized (+18%)</text>
          <text x="40" y="245" font-family="monospace" font-size="12" fill="#10B981">• Mobile Digital Key Issued to Guest Device ✓</text>
        </g>

        <g transform="translate(770, 110)">
          <rect width="630" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Guest Services &amp; Table POS</text>
          <rect x="24" y="60" width="582" height="80" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">In-Room QR Orders Today</text>
          <text x="40" y="120" font-family="sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">142 Orders · $4,890</text>

          <rect x="24" y="160" width="582" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="195" font-family="monospace" font-size="11" fill="#60A5FA">• Housekeeping Workflow Automated</text>
          <text x="40" y="225" font-family="monospace" font-size="11" fill="#60A5FA">• Restaurant Kitchen Display System Sync</text>
          <text x="40" y="255" font-family="monospace" font-size="11" fill="#10B981">• PMS Two-Way Integration Active</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'nonprofits',
    title: 'NGOs &amp; Nonprofits',
    subtitle: 'Transparent Giving, Program Impact Metrics &amp; Donor CRM',
    tag: 'Fundraising · Impact Dashboards · Donor Portals',
    metric1: '0.5%',
    metric1Label: 'Nonprofit Processing',
    metric2: '100%',
    metric2Label: 'Fund Transparency',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Nonprofit Impact &amp; Donor CRM</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Direct donation processing, transparent programmatic reporting, and volunteer dispatch</text>

        <g transform="translate(40, 110)">
          <rect width="700" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Global Aid Impact Dashboard</text>
          
          <rect x="24" y="60" width="652" height="90" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">Total Funds Deployed to Missions</text>
          <text x="40" y="125" font-family="sans-serif" font-size="26" font-weight="bold" fill="#FFFFFF">$4,850,200</text>
          <text x="320" y="125" font-family="sans-serif" font-size="14" fill="#10B981">100% Audited</text>

          <rect x="24" y="170" width="652" height="170" rx="8" fill="#111A3E"/>
          <text x="40" y="205" font-family="monospace" font-size="12" fill="#60A5FA">• 240,000+ Clean Water Beneficiaries</text>
          <text x="40" y="235" font-family="monospace" font-size="12" fill="#60A5FA">• Automated Tax Receipts Dispatched via Stripe</text>
          <text x="40" y="265" font-family="monospace" font-size="12" fill="#10B981">• Recurring Monthly Donor Retention: 91%</text>
        </g>

        <g transform="translate(770, 110)">
          <rect width="630" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Volunteer Management Hub</text>
          <rect x="24" y="60" width="582" height="80" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">Registered Global Volunteers</text>
          <text x="40" y="120" font-family="sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">8,420 Active</text>

          <rect x="24" y="160" width="582" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="195" font-family="monospace" font-size="11" fill="#60A5FA">• Shift Scheduling &amp; Check-in Mobile App</text>
          <text x="40" y="225" font-family="monospace" font-size="11" fill="#60A5FA">• Salesforce Nonprofit Success Pack (NPSP) Synced</text>
          <text x="40" y="255" font-family="monospace" font-size="11" fill="#10B981">• Low-Cost Serverless Hosting &lt;$30/mo</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'saas',
    title: 'SaaS &amp; Technology',
    subtitle: 'API Gateways, Multi-Tenant Cloud Architecture &amp; Enterprise SSO',
    tag: 'SAML SSO · SCIM · OpenAPI · Multi-Tenant RLS',
    metric1: 'Enterprise',
    metric1Label: 'Security Ready',
    metric2: '&lt;25ms',
    metric2Label: 'API P95 Response',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Enterprise SaaS &amp; Developer API Platform</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">SAML SSO, multi-tenant isolation, usage metering, and real-time webhook delivery</text>

        <g transform="translate(40, 110)">
          <rect width="700" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Developer API Gateway</text>
          
          <rect x="24" y="60" width="652" height="60" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="monospace" font-size="12" fill="#10B981">GET /v1/organizations/{id}/telemetry · 200 OK</text>
          <text x="520" y="90" font-family="monospace" font-size="11" fill="#AFD2FA">18ms</text>

          <rect x="24" y="140" width="652" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="175" font-family="monospace" font-size="12" fill="#60A5FA">• Enterprise SAML 2.0 / Okta SSO Connected</text>
          <text x="40" y="205" font-family="monospace" font-size="12" fill="#60A5FA">• SCIM Automated User Provisioning Active</text>
          <text x="40" y="235" font-family="monospace" font-size="12" fill="#60A5FA">• Webhook Retries via BullMQ Exponential Backoff</text>
          <text x="40" y="265" font-family="monospace" font-size="12" fill="#10B981">• SOC 2 Type II Compliance Logging Active</text>
        </g>

        <g transform="translate(770, 110)">
          <rect width="630" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Multi-Tenant Telemetry</text>
          <rect x="24" y="60" width="582" height="80" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">API Gateway Requests (24h)</text>
          <text x="40" y="120" font-family="sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">18,490,200</text>

          <rect x="24" y="160" width="582" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="195" font-family="monospace" font-size="11" fill="#60A5FA">• PostgreSQL RLS Data Isolation Verified</text>
          <text x="40" y="225" font-family="monospace" font-size="11" fill="#60A5FA">• Custom Domain TLS Automated (Cloudflare)</text>
          <text x="40" y="255" font-family="monospace" font-size="11" fill="#10B981">• High-Availability Cluster Healthy</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'professional-services',
    title: 'Professional Services',
    subtitle: 'Encrypted Matter Portals, AI Document Review &amp; Time/Billing',
    tag: 'Client Portals · AI Extraction · E-Signature · Matter CRM',
    metric1: 'AES-256',
    metric1Label: 'Document Encryption',
    metric2: '+22%',
    metric2Label: 'Billable Capture',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Professional Services Matter &amp; Billing Hub</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Confidential client document exchange, AI clause extraction, and automated time capture</text>

        <g transform="translate(40, 110)">
          <rect width="700" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Client Matter &amp; Document Portal</text>
          
          <rect x="24" y="60" width="652" height="60" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Matter #4920 · Merger Advisory Agreement</text>
          <text x="500" y="90" font-family="monospace" font-size="11" fill="#10B981">E-Signed ✓</text>

          <rect x="24" y="140" width="652" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="175" font-family="monospace" font-size="12" fill="#60A5FA">• AI Contract Analysis: 42 Clauses Verified</text>
          <text x="40" y="205" font-family="monospace" font-size="12" fill="#60A5FA">• Automated Time Capture: 18.5 Billable Hours</text>
          <text x="40" y="235" font-family="monospace" font-size="12" fill="#60A5FA">• Invoice Dispatched via Stripe Invoicing</text>
          <text x="40" y="265" font-family="monospace" font-size="12" fill="#10B981">• SOC 2 Aligned Security Protocol Verified</text>
        </g>

        <g transform="translate(770, 110)">
          <rect width="630" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Practice Utilization Analytics</text>
          <rect x="24" y="60" width="582" height="80" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">Fee-Earner Utilization Rate</text>
          <text x="40" y="120" font-family="sans-serif" font-size="24" font-weight="bold" fill="#10B981">92.4%</text>

          <rect x="24" y="160" width="582" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="195" font-family="monospace" font-size="11" fill="#60A5FA">• Clio / PracticePanther API Connected</text>
          <text x="40" y="225" font-family="monospace" font-size="11" fill="#60A5FA">• Real-Time WIP &amp; Matter Budget Tracking</text>
          <text x="40" y="255" font-family="monospace" font-size="11" fill="#10B981">• Zero Unbilled Hour Leakage</text>
        </g>
      </g>
    `,
  },
  {
    slug: 'retail',
    title: 'Retail',
    subtitle: 'Omnichannel POS Sync, Loyalty Apps &amp; Demand Replenishment',
    tag: 'Omnichannel · POS Sync · Loyalty App · BOPIS',
    metric1: '&lt;1 sec',
    metric1Label: 'Store-to-Web Sync',
    metric2: '4.9 ★',
    metric2Label: 'Loyalty App Rating',
    content: `
      <g transform="translate(80, 140)">
        <rect width="1440" height="540" rx="20" fill="#111A3E" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/>
        <text x="40" y="50" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">Omnichannel Retail &amp; POS Synchronization</text>
        <text x="40" y="76" font-family="sans-serif" font-size="13" fill="#AFD2FA">Unified inventory across brick-and-mortar stores, customer loyalty rewards, and click-and-collect</text>

        <g transform="translate(40, 110)">
          <rect width="700" height="380" rx="14" fill="#182350"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Multi-Store Inventory Engine</text>
          
          <rect x="24" y="60" width="652" height="60" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Store #01 (Downtown): 142 in Stock</text>
          <text x="480" y="90" font-family="monospace" font-size="11" fill="#10B981">Synced (&lt;1s) ✓</text>

          <rect x="24" y="140" width="652" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="175" font-family="monospace" font-size="12" fill="#60A5FA">• Cloud POS Integration (Square, Lightspeed, Shopify)</text>
          <text x="40" y="205" font-family="monospace" font-size="12" fill="#60A5FA">• Click-and-Collect (BOPIS) Ready for Pickup</text>
          <text x="40" y="235" font-family="monospace" font-size="12" fill="#60A5FA">• AI Demand Forecasting Automated Reorders</text>
          <text x="40" y="265" font-family="monospace" font-size="12" fill="#10B981">• Zero Duplicate Deductions on Flash Sales</text>
        </g>

        <g transform="translate(770, 110)">
          <rect width="630" height="380" rx="14" fill="#1F2B5B"/>
          <text x="24" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Customer Loyalty Platform</text>
          <rect x="24" y="60" width="582" height="80" rx="8" fill="#111A3E"/>
          <text x="40" y="90" font-family="sans-serif" font-size="12" fill="#AFD2FA">Active Loyalty Program Members</text>
          <text x="40" y="120" font-family="sans-serif" font-size="24" font-weight="bold" fill="#10B981">64,280 Members</text>

          <rect x="24" y="160" width="582" height="180" rx="8" fill="#111A3E"/>
          <text x="40" y="195" font-family="monospace" font-size="11" fill="#60A5FA">• In-Store Barcode &amp; Wallet Pass Scanning</text>
          <text x="40" y="225" font-family="monospace" font-size="11" fill="#60A5FA">• Automated Tier Upgrades &amp; SMS Rewards</text>
          <text x="40" y="255" font-family="monospace" font-size="11" fill="#10B981">• Repeat Purchase Rate: +32%</text>
        </g>
      </g>
    `,
  },
];

function buildSvg(item, isService = true) {
  return `
  <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B1535"/>
        <stop offset="40%" stop-color="#0F1B44"/>
        <stop offset="100%" stop-color="#182350"/>
      </linearGradient>
      <linearGradient id="blueGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59,130,246,0.06)" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Base Canvas -->
    <rect width="1600" height="1000" fill="url(#bgGrad)"/>
    <rect width="1600" height="1000" fill="url(#grid)"/>

    <!-- Subtle Ambient Glows -->
    <circle cx="300" cy="200" r="350" fill="#3B82F6" opacity="0.12" filter="blur(80px)"/>
    <circle cx="1300" cy="800" r="400" fill="#2563EB" opacity="0.10" filter="blur(100px)"/>

    <!-- Top Header Bar in Mockup -->
    <g transform="translate(80, 50)">
      <rect width="1440" height="60" rx="14" fill="#111A3E" stroke="rgba(255,255,255,0.08)"/>
      <circle cx="30" cy="30" r="8" fill="#3B82F6"/>
      <text x="50" y="35" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">ZEPLOY TECH</text>
      <text x="170" y="35" font-family="sans-serif" font-size="12" fill="#AFD2FA">/ ${isService ? 'SERVICES' : 'INDUSTRIES'} / ${item.slug.toUpperCase()}</text>

      <rect x="1260" y="14" width="160" height="32" rx="16" fill="rgba(59,130,246,0.2)" stroke="#3B82F6" stroke-width="1"/>
      <text x="1340" y="34" font-family="monospace" font-size="11" font-weight="bold" fill="#60A5FA" text-anchor="middle">LIVE ARCHITECTURE</text>
    </g>

    <!-- Main Panel Content -->
    ${item.panelContent || item.content}

    <!-- Bottom Metric Banner -->
    <g transform="translate(80, 840)">
      <rect width="1440" height="110" rx="16" fill="#0B1535" stroke="rgba(255,255,255,0.1)"/>
      
      <!-- Logo Tag -->
      <text x="40" y="45" font-family="sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF">${item.title}</text>
      <text x="40" y="75" font-family="sans-serif" font-size="13" fill="#AFD2FA">${item.subtitle}</text>

      <!-- Metrics -->
      ${
        isService
          ? item.metrics
              .map(
                (m, idx) => `
          <g transform="translate(${700 + idx * 240}, 20)">
            <text x="0" y="24" font-family="sans-serif" font-size="11" fill="#AFD2FA" text-transform="uppercase">${m.label}</text>
            <text x="0" y="60" font-family="sans-serif" font-size="24" font-weight="bold" fill="#60A5FA">${m.value}</text>
          </g>
        `
              )
              .join('')
          : `
          <g transform="translate(740, 20)">
            <text x="0" y="24" font-family="sans-serif" font-size="11" fill="#AFD2FA" text-transform="uppercase">${item.metric1Label}</text>
            <text x="0" y="60" font-family="sans-serif" font-size="24" font-weight="bold" fill="#10B981">${item.metric1}</text>
          </g>
          <g transform="translate(1040, 20)">
            <text x="0" y="24" font-family="sans-serif" font-size="11" fill="#AFD2FA" text-transform="uppercase">${item.metric2Label}</text>
            <text x="0" y="60" font-family="sans-serif" font-size="24" font-weight="bold" fill="#60A5FA">${item.metric2}</text>
          </g>
        `
      }
    </g>
  </svg>
  `;
}

async function run() {
  console.log('Generating service detail visuals...');
  for (const s of services) {
    const svg = buildSvg(s, true);
    const dest = path.join(process.cwd(), 'public', 'detail', 'services', `${s.slug}.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(dest);
    console.log(`✓ Generated service visual: ${s.slug}.webp`);
  }

  console.log('Generating industry detail visuals...');
  for (const ind of industries) {
    const svg = buildSvg(ind, false);
    const dest = path.join(process.cwd(), 'public', 'detail', 'industries', `${ind.slug}.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(dest);
    console.log(`✓ Generated industry visual: ${ind.slug}.webp`);
  }

  console.log('✅ ALL 18 DETAIL VISUALS GENERATED SUCCESSFULLY!');
}

run().catch(console.error);
