import type { Metadata } from "next";
import { HomePage } from "@/components/homepage";
import { SiteShell } from "@/components/site-shell";
import { mayaContent } from "@/content/maya";

export const metadata: Metadata = {
  title: "Anxiety & Trauma Therapy in Santa Monica | Dr. Maya Reynolds",
  description: "Explore adult therapy for anxiety, trauma, and burnout with Dr. Maya Reynolds. In-person sessions in Santa Monica, CA, and online therapy across California.",
  alternates: { canonical: "/" },
};

export default function MayaPage() {
  return <SiteShell theme="maya"><HomePage content={mayaContent} theme="maya" /></SiteShell>;
}
