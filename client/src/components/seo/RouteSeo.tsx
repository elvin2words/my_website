import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { DEFAULT_OG_IMAGE, getSeoConfig, SITE_NAME, SITE_URL } from "@/lib/seo";

function toAbsoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_URL}${normalizedPath}`;
}

const RouteSeo: React.FC = () => {
  const [location] = useLocation();

  const seo = useMemo(() => getSeoConfig(location), [location]);
  const canonicalUrl = toAbsoluteUrl(seo.path);
  const imageUrl = toAbsoluteUrl(seo.image || DEFAULT_OG_IMAGE);

  const robots = seo.noindex
    ? "noindex,nofollow,noarchive"
    : "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Elvin E. Mazwimairi",
        url: SITE_URL,
        image: toAbsoluteUrl("/prof.jpg"),
        jobTitle: "Electrical Engineer and Full Stack Developer",
        sameAs: [
          "https://www.linkedin.com/in/elvin-mazwimairi",
          "https://github.com/elvin2words",
          "https://instagram.com/young_mazwi",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#person`,
        },
      },
    ],
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="Elvin Mazwimairi" />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={seo.type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${seo.title} preview`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@young_mazwi" />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default RouteSeo;
