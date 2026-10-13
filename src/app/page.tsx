import { Booking } from "@/components/Booking";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Care, Faq, Footer, Intro, Process, Services, Work } from "@/components/Sections";
import { services } from "@/content/copy";
import { site } from "@/content/site";

function structuredData() {
  // Only verified facts. Optional fields are added once filled in site.ts.
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: site.instagramName,
    alternateName: `@${site.handle}`,
    url: site.siteUrl,
    sameAs: [site.instagramUrl],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
      ...(site.streetAddress && { streetAddress: site.streetAddress }),
      ...(site.postalCode && { postalCode: site.postalCode }),
    },
    areaServed: { "@type": "City", name: `${site.city}, New Jersey` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Permanent makeup and SMP",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  };
  if (site.phone) data.telephone = site.phone;
  if (site.email) data.email = site.email;
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData() }} />
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Services />
        <Process />
        <Work />
        <Care />
        <Faq />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
