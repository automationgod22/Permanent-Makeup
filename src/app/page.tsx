import { Booking } from "@/components/Booking";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Care, Footer, Marquee, Statement, Work } from "@/components/Sections";
import { ServiceExplorer } from "@/components/ServiceExplorer";
import { SmoothScroll } from "@/components/SmoothScroll";
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
      <SmoothScroll />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Statement />
        <ServiceExplorer />
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
