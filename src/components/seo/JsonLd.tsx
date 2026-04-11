import { getSiteUrl, SITE_DESCRIPTION } from "@/lib/site";

export default function JsonLd() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Jatin Sharma",
        url,
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "Person",
        name: "Jatin Sharma",
        url,
        sameAs: [
          "https://github.com/MrtitaniumJ",
          "https://www.linkedin.com/in/jatin-sharma-82121217a/",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
