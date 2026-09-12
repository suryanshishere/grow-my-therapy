import type { Metadata } from "next";
import { HomePage } from "@/components/homepage";
import { SiteShell } from "@/components/site-shell";
import { originalContent } from "@/content/original";

export const metadata: Metadata = {
  title: "Original Homepage Study | Grow My Therapy Assignment",
  description: "A responsive recreation of the Conejo Valley Family Counseling homepage, created as a frontend development assignment.",
  robots: { index: false, follow: false },
};

export default function OriginalPage() {
  return <SiteShell theme="original"><HomePage content={originalContent} theme="original" /></SiteShell>;
}
