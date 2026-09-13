import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SiteShell } from "@/components/site-shell";
import { mayaContactFields, mayaContactIntro, mayaContactTitle } from "@/content/contact";
import "@/styles/contact.css";

export const metadata: Metadata = {
  title: "Book an Appointment | Dr. Maya Reynolds",
  description: "Request a first session with Dr. Maya Reynolds, PsyD, in her Santa Monica office or through secure telehealth across California.",
  alternates: { canonical: "/contact/" },
};

export default function MayaContactPage() {
  return <SiteShell theme="maya">
    <main id="main-content" className="contact-page">
      <div className="contact-page-grid">
        <div className="contact-page-intro">
          <p className="eyebrow">{mayaContactIntro.eyebrow}</p>
          <h1>{mayaContactTitle.map((part, index) => part.italic
            ? <em key={index}>{part.text}</em>
            : <span key={index}>{part.text}</span>)}</h1>
          <p className="contact-page-lead">{mayaContactIntro.body}</p>
          <hr className="contact-page-rule" />
          <address className="contact-page-details">
            {mayaContactIntro.details.map((line) => <span key={line}>{line}</span>)}
          </address>
          <p className="contact-page-note">{mayaContactIntro.note}</p>
        </div>
        <div className="contact-page-form">
          <ContactForm fields={mayaContactFields} submitLabel="Request appointment" notice={<>
            <h2>Thank you. This is a demonstration form.</h2>
            <p>Nothing was sent and no information was stored. Dr. Maya Reynolds is a fictional therapist created for a design assignment, so appointments can’t be booked here.</p>
          </>} />
        </div>
      </div>
    </main>
  </SiteShell>;
}
