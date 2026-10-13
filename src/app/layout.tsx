import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const italiana = localFont({
  src: "./fonts/italiana-latin-400-normal.woff2",
  variable: "--font-italiana",
  weight: "400",
  display: "swap",
});

const hanken = localFont({
  src: "./fonts/hanken-grotesk-latin-wght-normal.woff2",
  variable: "--font-hanken",
  weight: "100 900",
  display: "swap",
});

const title = `Permanent Makeup & SMP in Jersey City | @${site.handle}`;
const description =
  "Ombré brows, nude blush lips, eye definition and scalp micropigmentation for hairlines and density in Jersey City, NJ. Book a consultation by Instagram message.";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/",
    siteName: `@${site.handle}`,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2a1d24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${italiana.variable} ${hanken.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
