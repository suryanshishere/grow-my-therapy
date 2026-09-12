import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/index.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/dm-sans/index.css";
import "@fontsource-variable/mulish/index.css";
import "@fontsource/cormorant-garamond/latin-300.css";
import "@fontsource/cormorant-garamond/latin-300-italic.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/allura/latin-400.css";
import "./globals.css";
import "@/styles/homepage.css";
import "@/styles/shell.css";
import "@/styles/maya.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grow-my-therapy-suryansh.pages.dev"),
  title: "Anxiety & Trauma Therapy in Santa Monica | Dr. Maya Reynolds",
  description: "A thoughtful, collaborative approach to anxiety, trauma, and burnout. Explore adult therapy with Dr. Maya Reynolds in Santa Monica and online across California.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Dr. Maya Reynolds | Space to feel like yourself",
    description: "Adult therapy for anxiety, trauma, and burnout in Santa Monica and online across California.",
    images: [{ url: "/images/maya-office-one.webp", width: 1500, height: 1125, alt: "A light-filled therapy office" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#234C5A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
