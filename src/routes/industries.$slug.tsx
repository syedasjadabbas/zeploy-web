import { createFileRoute, notFound } from "@tanstack/react-router";
import { industriesBySlug, industries } from "@/data/industries";
import { DetailPageLayout } from "@/components/zeploy/DetailPageLayout";

export const Route = createFileRoute("/industries/$slug")({
  component: IndustryDetailPage,
  head: ({ params }) => {
    const industry = industriesBySlug[params.slug] || industries[0];
    return {
      meta: [
        { title: industry.meta.title },
        { name: "description", content: industry.meta.description },
        { property: "og:title", content: industry.meta.title },
        { property: "og:description", content: industry.meta.description },
        { property: "og:url", content: industry.meta.canonical },
        { property: "og:image", content: "https://www.zeploy.tech/logo.webp" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: industry.meta.title },
        { name: "twitter:description", content: industry.meta.description },
        { name: "twitter:image", content: "https://www.zeploy.tech/logo.webp" },
      ],
      links: [
        { rel: "canonical", href: industry.meta.canonical },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${industry.title} Software Development`,
            provider: {
              "@type": "Organization",
              name: "Zeploy Tech",
              url: "https://www.zeploy.tech",
            },
            description: industry.overview,
            url: industry.meta.canonical,
          }),
        },
      ],
    };
  },
});

function IndustryDetailPage() {
  const { slug } = Route.useParams();
  const industry = industriesBySlug[slug];

  if (!industry) {
    throw notFound();
  }

  return (
    <DetailPageLayout
      category="Industry"
      title={industry.title}
      tagline={industry.tagline}
      overview={industry.overview}
      image={industry.image}
      imageAlt={industry.imageAlt}
      problemsOrChallengesTitle="Industry Challenges & Constraints"
      problemsOrChallenges={industry.challenges}
      deliverablesOrSolutionsTitle="Software Solutions We Deliver"
      deliverablesOrSolutions={industry.solutions}
      useCases={industry.useCases}
      capabilities={industry.capabilities}
      stackOrTechConsiderations={industry.techConsiderations}
      stackOrTechTitle="Architectural & Technology Considerations"
      relatedProjects={industry.relatedProjects}
      relatedLinks={industry.relatedServices.map((srv) => ({
        label: srv.label,
        slug: srv.slug,
        type: "services" as const,
      }))}
      relatedLinksTitle="Relevant Engineering Services"
      faq={industry.faq}
    />
  );
}
