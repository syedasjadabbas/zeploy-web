import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Nav from '@/components/zeploy/Nav';
import { Footer } from '@/components/zeploy/Sections';
import { useEffect } from 'react';

export const Route = createFileRoute('/notes/$slug')({
  component: NotePage,
});

function NotePage() {
  const { slug } = Route.useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const post = posts.find(p => p.slug === slug) || posts[0];

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-electric/30">
      <Nav />
      <article className="pt-40 pb-32 px-6 md:px-12 mx-auto max-w-4xl min-h-[80vh]">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-electric transition-colors mb-12 font-mono text-xs uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          Back to Studio
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 text-electric-soft font-mono text-xs uppercase tracking-widest mb-6">
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-electric-soft/50" />
            <span>{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight text-gradient-soft mb-8">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
            {post.description}
          </p>
          <div className="h-px w-full bg-white/5 mb-12" />
          <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-muted-foreground">
            <p>
              This is a premium detailed view for the engineering note. In a production environment, this would be populated with rich markdown or CMS content detailing the architectural decisions, code snippets, and performance metrics associated with this specific case study.
            </p>
            <p>
              Zeploy Tech engineers approach problems from first principles, ensuring every system is scalable, robust, and designed for long-term maintainability. 
            </p>
          </div>
        </motion.div>
      </article>
      <Footer />
    </main>
  );
}
