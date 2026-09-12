import Link from "next/link";
import type { ReactNode } from "react";
import { Action, DialogProvider, HeaderNavigation } from "./interactions";
import { Photo } from "./photo";
import type { Theme } from "@/content/types";

const originalFooterTeam = [
  ["Jennifer Anderson", "jennifer-anderson"],
  ["Heather Williams-Baumgart", "heather-williams-baumgart"],
  ["Autumn Bodily", "autumn-bodily"],
  ["Michaela Gorospe", "michaela-gorospe"],
  ["Candace Bletscher", "candace-bletscher"],
  ["Samantha Johnson", "samantha-johnson"],
  ["Andrea Watkins", "andrea-watkins"],
  ["Rosa Gomez", "rosa-gomez"],
  ["Chad Flores", "chad-flores"],
];

function Brand({ theme, footer = false }: { theme: Theme; footer?: boolean }) {
  return theme === "maya" ? <Link href="/" className={`maya-brand ${footer ? "maya-brand--footer" : ""}`} aria-label="Dr. Maya Reynolds home">
    <span className="brand-name">Dr. Maya Reynolds<span className="brand-dot">.</span></span>
    <span className="brand-caption">Clinical psychologist · Santa Monica</span>
  </Link> : <Link href="/original/" className="original-brand" aria-label="Conejo Valley Family Counseling homepage clone"><Photo src="/images/original-logo.webp" alt="Conejo Valley Family Counseling" fill={false} sizes="(max-width: 767px) 200px, 257px" /></Link>;
}

export function SiteShell({ theme, children }: { theme: Theme; children: ReactNode }) {
  const original = theme === "original";
  return <div className={`site-shell theme-${theme}`} data-theme={theme}>
    <DialogProvider theme={theme}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header"><div className="header-inner"><Brand theme={theme} /><HeaderNavigation theme={theme} /></div></header>
      {children}
      <footer className="practice-footer">
        <div className="footer-grid">
          <div className="footer-brand-column"><Brand theme={theme} footer />
            <p>{original ? "We want to make getting started simple. You’re welcome to come into our office in Newbury Park or schedule virtual appointments from anywhere in CA—whatever works best for you." : "Practical tools. Thoughtful reflection. Space to feel more like yourself."}</p>
            {!original && <p className="footer-credential">Dr. Maya Reynolds, PsyD<br />Licensed Clinical Psychologist</p>}
          </div>
          <div className="footer-links"><h2>{original ? "Navigate" : "Explore"}</h2>
            {original ? <><Link href="/original/">Home</Link><a href="https://www.conejovalleycounseling.com/therapists-newbury-park">About</a><a href="https://www.conejovalleycounseling.com/faqs">FAQs</a><a href="https://www.conejovalleycounseling.com/contact">Contact</a></> : <><a href="#about">Meet Maya</a><a href="#services">Services</a><a href="#office">Our office</a><Action dialog="faq" className="footer-action">FAQs</Action></>}
          </div>
          <div className="footer-links footer-methods"><h2>{original ? "Our team" : "My approach"}</h2>
            {original ? originalFooterTeam.map(([name, path]) => <a key={path} href={`https://www.conejovalleycounseling.com/${path}`}>{name}</a>) : <><a href="#method-1">CBT</a><a href="#method-2">EMDR</a><a href="#method-3">Mindfulness</a><a href="#method-4">Body-oriented therapy</a></>}
          </div>
          <div className="footer-location"><h2>{original ? "Contact" : "Find your space"}</h2>
            <p>{original ? <>925 Broadbeck Dr<br />Suites 200 and 225<br />Newbury Park, CA 91320<br /><a href="mailto:info@conejovalleycounseling.com">info@conejovalleycounseling.com</a><br /><a href="tel:8052423120">805.242.3120</a></> : <>Santa Monica, CA 90401<br />In person & online across California</>}</p>
            {original ? <p className="original-service-area">Serving Thousand Oaks, Westlake Village, Camarillo, Moorpark, &amp; Simi Valley</p> : <Action dialog="consultation">Let’s connect</Action>}
          </div>
        </div>
      </footer>
      <div className="site-colophon">
        <p>{original ? <><a href="https://www.conejovalleycounseling.com/terms">Terms</a> | <a href="https://www.conejovalleycounseling.com/privacy-policy">Privacy Policy</a> | <a href="https://www.conejovalleycounseling.com/disclaimer">Disclaimer</a> | Website by <a href="https://walkerstrategyco.com">Walker Strategy Co.</a></> : "© 2026 Dr. Maya Reynolds · Fictional practice · Internship concept"}</p>
        <Link href={original ? "/" : "/original/"}>{original ? "View Maya’s redesign" : "View the original clone"}<span aria-hidden="true"> ↗</span></Link>
      </div>
    </DialogProvider>
  </div>;
}
