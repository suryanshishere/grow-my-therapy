import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SiteShell } from "@/components/site-shell";
import { contactIntro, contactTitle } from "@/content/contact";
import "@/styles/contact.css";

export const metadata: Metadata = {
  title: "Contact Page Study | Grow My Therapy Assignment",
  description: "A responsive recreation of the Conejo Valley Family Counseling contact page, created as a frontend development assignment.",
  robots: { index: false, follow: false },
};

export default function OriginalContactPage() {
  return <SiteShell theme="original">
    <main id="main-content" className="contact-page">
      <div className="contact-page-grid">
        <div className="contact-page-intro">
          <h1>{(contactTitle as { text: string; accent?: boolean }[]).map((part, index) => part.accent
            ? <span key={index} className="script-accent">{part.text}</span>
            : <span key={index}>{part.text}</span>)}</h1>
          <p className="contact-page-lead">{contactIntro.body}</p>
          <hr className="contact-page-rule" />
          <address className="contact-page-details">
            {contactIntro.address.map((line) => <span key={line}>{line}</span>)}
            <a href={`mailto:${contactIntro.email}`}>{contactIntro.email}</a>
            <a href={contactIntro.phone.href}>{contactIntro.phone.label}</a>
          </address>
        </div>
        <div className="contact-page-form"><ContactForm /></div>
      </div>
    </main>
  </SiteShell>;
}
