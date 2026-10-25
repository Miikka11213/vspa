const origin = "https://vspa.ca";

// Describe only the current visible service/article; prices are not full treatment quotes.
export function PageStructuredData({ item, kind }) {
  const isService = kind === "Service";
  const pathname = item.path || (isService ? "/services/" : "/guides/") + item.slug;
  const url = origin + pathname;
  const parent = isService ? ["Services", "/services"] : ["Spa guides", "/guides"];
  const description = item.seoDescription || item.description || item.summary;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [["Home", "/"], parent, [item.title, pathname]].map(([name, path], index) => ({
        "@type": "ListItem", position: index + 1, name, item: origin + path,
      })),
    },
    isService ? {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": url + "#service",
      name: item.seoTitle || item.title,
      description,
      url,
      provider: { "@id": origin + "/#business" },
      areaServed: { "@type": "City", name: "Toronto" },
    } : {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": url + "#article",
      headline: item.title,
      description,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "V Spa", url: origin + "/" },
      publisher: { "@id": origin + "/#business" },
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
