import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Nav from '@/components/zeploy/Nav';
import { Footer } from '@/components/zeploy/Sections';
import { CodeWindow } from '@/components/zeploy/CodeWindow';
import { noteSnippets } from '@/data/codeSnippets';
import { useEffect } from 'react';

const posts = [
  {
    category: "Architecture",
    date: "Aug 12, 2025",
    title: "Why we abandoned microservices for a modular monolith",
    description: "A deep dive into our infrastructure rewrite that reduced AWS costs by 40% and improved developer velocity.",
    slug: "abandoned-microservices",
  },
  {
    category: "AI Systems",
    date: "Sep 28, 2025",
    title: "Scaling LLM inference in production",
    description: "Techniques for managing latency, token streaming, and cost when deploying large language models to thousands of users.",
    slug: "scaling-llm-inference",
  },
  {
    category: "Performance",
    date: "Nov 04, 2026",
    title: "Achieving 99.99% uptime with global edge networks",
    description: "How we architected a multi-region failover system that survived two major cloud provider outages.",
    slug: "edge-networks-uptime",
  },
];

export const Route = createFileRoute('/notes/$slug')({
  component: NotePage,
  head: ({ params }) => {
    const post = posts.find(p => p.slug === params.slug) || posts[0];
    return {
      meta: [
        { title: `${post.title} | Zeploy Tech Engineering Notes` },
        { name: "description", content: post.description },
        { property: "og:title", content: `${post.title} | Zeploy Tech Engineering Notes` },
        { property: "og:description", content: post.description },
        { property: "og:url", content: `https://www.zeploy.tech/notes/${params.slug}` },
        { property: "og:image", content: "https://www.zeploy.tech/logo-full.webp" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${post.title} | Zeploy Tech Engineering Notes` },
        { name: "twitter:description", content: post.description },
        { name: "twitter:image", content: "https://www.zeploy.tech/logo-full.webp" },
      ],
      links: [
        { rel: "canonical", href: `https://www.zeploy.tech/notes/${params.slug}` },
      ],
    };
  },
});

function NotePage() {
  const { slug } = Route.useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post = posts.find(p => p.slug === slug) || posts[0];
  const snippet = noteSnippets[post.slug];

  return (
    <main className="relative min-h-screen bg-bg text-text selection:bg-primary/30">
      <Nav />
      <article className="pt-40 pb-32 px-6 md:px-12 mx-auto max-w-4xl min-h-[80vh]">
        <Link to="/" className="inline-flex items-center gap-2 text-text-subtle hover:text-accent-text transition-colors mb-12 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Studio
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 text-accent-text text-[14px] sm:text-[15px] font-medium tracking-normal mb-6">
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-accent-text/50" />
            <span>{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-[1.1] tracking-[-0.022em] text-text-heading mb-8">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-text-muted leading-relaxed mb-12">
            {post.description}
          </p>
          <div className="h-px w-full bg-border mb-12" />

          {snippet && (
            <div className="my-10">
              <div className="flex items-center gap-2 text-accent-text text-[14px] sm:text-[15px] font-medium tracking-normal mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Production Implementation
              </div>
              <CodeWindow
                fileName={snippet.fileName}
                language={snippet.language}
                code={snippet.code}
                status={snippet.status}
                badge={snippet.badge}
              />
            </div>
          )}

          <div className="prose dark:prose-invert prose-lg md:prose-xl max-w-none text-text-muted mt-12">
            <p>
              In production environments, architectural choices dictate system resilience and iteration velocity. By codifying our infrastructure, enforcing strict boundary isolation, and automating observability, we ensure high availability under real-world loads.
            </p>
            <p>
              Zeploy Tech engineers approach complex distributed systems from first principles, ensuring every solution is maintainable, cost-effective, and built for long-term operational excellence.
            </p>
          </div>
        </motion.div>
      </article>
      <Footer />
    </main>
  );
}
