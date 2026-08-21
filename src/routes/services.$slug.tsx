import { createFileRoute, notFound } from "@tanstack/react-router";
import { servicesBySlug, services } from "@/data/services";
import { serviceSnippets } from "@/data/codeSnippets";
import { DetailPageLayout } from "@/components/zeploy/DetailPageLayout";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetailPage,
  head: ({ params }) => {
    const service = servicesBySlug[params.slug] || services[0];
    return {
      meta: [
        { title: service.meta.title },
        { name: "description", content: service.meta.description },
        { property: "og:title", content: service.meta.title },
        { property: "og:description", content: service.meta.description },
        { property: "og:url", content: service.meta.canonical },
        { property: "og:image", content: "https://www.zeploy.tech/logo.webp" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: service.meta.title },
        { name: "twitter:description", content: service.meta.description },
        { name: "twitter:image", content: "https://www.zeploy.tech/logo.webp" },
      ],
      links: [
        { rel: "canonical", href: service.meta.canonical },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            provider: {
              "@type": "Organization",
              name: "Zeploy Tech",
              url: "https://www.zeploy.tech",
            },
            description: service.overview,
            url: service.meta.canonical,
          }),
        },
      ],
    };
  },
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = servicesBySlug[slug];

  if (!service) {
    throw notFound();
  }

  return (
    <DetailPageLayout
      category="Service"
      title={service.title}
      tagline={service.tagline}
      overview={service.overview}
      image={service.image}
      imageAlt={service.imageAlt}
      problemsOrChallengesTitle="Problems We Solve"
      problemsOrChallenges={service.problems}
      deliverablesOrSolutionsTitle="What We Deliver"
      deliverablesOrSolutions={service.deliverables}
      capabilities={service.capabilities}
      stackOrTechConsiderations={service.stack}
      stackOrTechTitle="Core Technologies & Frameworks"
      approach={service.approach}
      relatedProjects={service.relatedProjects}
      relatedLinks={service.relatedIndustries.map((ind) => ({
        label: ind.label,
        slug: ind.slug,
        type: "industries" as const,
      }))}
      relatedLinksTitle="Industries We Apply This To"
      faq={service.faq}
      codeSnippet={serviceSnippets[slug]}
    />
  );
}
