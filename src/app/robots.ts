import type { MetadataRoute } from "next";
import { reviewMode, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Keep the preview out of search engines until the studio approves it.
  if (reviewMode) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}
