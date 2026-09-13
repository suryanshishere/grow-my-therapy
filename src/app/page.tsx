import type { Metadata, Viewport } from "next";
import { MayaHomePage } from "@/components/maya-homepage";
import { SiteShell } from "@/components/site-shell";
import { mayaContent } from "@/content/maya";

export const metadata: Metadata = {
  title: "Therapy in Santa Monica for Anxiety & Trauma | Dr. Maya Reynolds",
  description: "Adult therapy for anxiety, trauma and burnout with Dr. Maya Reynolds, PsyD. Meet in her Santa Monica office or through secure telehealth across California.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Dr. Maya Reynolds | Therapy in Santa Monica",
    description: "Practical tools and space for deeper understanding. Therapy for adults navigating anxiety, trauma and burnout, in person or online across California.",
    images: [{ url: "/images/maya-office-one.webp", width: 1500, height: 1125, alt: "Natural light and comfortable seating in Dr. Maya Reynolds’ Santa Monica office" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Maya Reynolds | Therapy in Santa Monica",
    description: "Adult therapy for anxiety, trauma and burnout in Santa Monica and online across California.",
    images: ["/images/maya-office-one.webp"],
  },
};

export const viewport: Viewport = { themeColor: "#303B32" };

export default function MayaPage() {
  return <SiteShell theme="maya"><MayaHomePage content={mayaContent} /></SiteShell>;
}
