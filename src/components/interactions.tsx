"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { faqs, navigation, type NavigationItem } from "@/content/navigation";
import type { Theme } from "@/content/types";

type DialogKind = "consultation" | "faq" | "menu";
const DialogContext = createContext<{ open: (kind: DialogKind) => void; close: () => void } | null>(null);

export function Action({ href, dialog, children, className = "", oval = false, ariaLabel }: {
  href?: string; dialog?: "consultation" | "faq"; children: ReactNode;
  className?: string; oval?: boolean; ariaLabel?: string;
}) {
  const context = useContext(DialogContext);
  const style = `${oval ? "action-oval" : "action-link"} ${className}`;
  if (dialog) return <button type="button" className={style} onClick={() => context?.open(dialog)} aria-label={ariaLabel} aria-haspopup="dialog">{children}</button>;
  return <a href={href} className={style} aria-label={ariaLabel}>{children}</a>;
}

function MenuLink({ item, close }: { item: NavigationItem; close: () => void }) {
  const context = useContext(DialogContext);
  if (item.dialog) return <button type="button" onClick={() => context?.open(item.dialog!)}>{item.label}</button>;
  return <a href={item.href} onClick={close}>{item.label}</a>;
}

export function DialogProvider({ theme, children }: { theme: Theme; children: ReactNode }) {
  const [kind, setKind] = useState<DialogKind | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = (next: DialogKind) => {
    if (!ref.current?.open) opener.current = document.activeElement as HTMLElement;
    setKind(next);
  };
  const close = () => ref.current?.close();
  useEffect(() => {
    const element = ref.current;
    if (!element || !kind) return;
    if (!element.open) element.showModal();
    element.querySelector<HTMLButtonElement>(".dialog-close")?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [kind]);
  return <DialogContext.Provider value={{ open, close }}>
    {children}
    <dialog ref={ref} className={`site-dialog ${kind === "menu" ? "mobile-menu" : "content-dialog"}`} aria-labelledby="dialog-title"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary, [tabindex="0"]')).filter(element => element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) { event.preventDefault(); return; }
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }}
      onClose={() => { setKind(null); if (opener.current?.isConnected) opener.current.focus(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="dialog-surface">
        <button type="button" className="dialog-close" onClick={close} aria-label="Close dialog"><span aria-hidden="true">×</span></button>
        {kind === "menu" ? <>
          <p className="eyebrow" id="dialog-title">{theme === "maya" ? "Dr. Maya Reynolds" : "Conejo Valley Family Counseling"}</p>
          <nav aria-label="Mobile navigation" className="mobile-navigation">
            {navigation[theme].map((item) => item.children ? <details key={item.label}>
              <summary>{item.label}<span aria-hidden="true">+</span></summary>
              <div className="mobile-submenu">{item.children.map((child) => <MenuLink key={child.label} item={child} close={close} />)}</div>
            </details> : <MenuLink key={item.label} item={item} close={close} />)}
          </nav>
          {theme === "maya" ? <Action dialog="consultation" oval>Let’s connect</Action> : <Action href="https://www.conejovalleycounseling.com/contact" oval>Contact</Action>}
          <p className="menu-location">{theme === "maya" ? "Santa Monica, CA · Online across California" : "Newbury Park, California"}</p>
        </> : kind === "faq" ? <>
          <p className="eyebrow">A little more clarity</p>
          <h2 id="dialog-title">Before we begin.</h2>
          <div className="faq-list">{faqs.map((faq) => <details key={faq.question}>
            <summary>{faq.question}<span aria-hidden="true">+</span></summary>
            <p>{faq.answer}</p>
          </details>)}</div>
          <p className="dialog-note">This website presents a fictional therapist for a design assignment.</p>
        </> : kind === "consultation" ? <>
          <p className="eyebrow">A thoughtful next step</p>
          <h2 id="dialog-title">A space to explore<br /><em>what you need.</em></h2>
          <p className="dialog-intro">Therapy can be a place to slow down, make sense of what you’re carrying, and feel more connected to yourself.</p>
          <div className="session-options">
            <div><span className="session-marker" aria-hidden="true">↗</span><h3>In person</h3><p>A quiet, private office in<br />Santa Monica, CA 90401.</p></div>
            <div><span className="session-marker" aria-hidden="true">↗</span><h3>Online</h3><p>Secure telehealth for adults<br />located in California.</p></div>
          </div>
          <div className="demo-notice"><strong>About this demo</strong><p>Dr. Maya Reynolds is a fictional therapist. This is a demonstration website, and appointments cannot be booked here.</p></div>
          <button type="button" className="action-link" onClick={close}>Back to exploring</button>
        </> : null}
      </div>
    </dialog>
  </DialogContext.Provider>;
}

export function HeaderNavigation({ theme }: { theme: Theme }) {
  const context = useContext(DialogContext);
  const [expanded, setExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => { if (!navRef.current?.contains(event.target as Node)) setExpanded(null); };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);
  return <>
    <nav ref={navRef} className="desktop-navigation" aria-label="Main navigation" onKeyDown={(event) => {
      if (event.key === "Escape") { setExpanded(null); navRef.current?.querySelector<HTMLButtonElement>(`[data-dropdown="${expanded}"]`)?.focus(); }
    }}>
      {navigation[theme].map((item) => item.children ? <div className="nav-dropdown" key={item.label}
        onMouseEnter={() => setExpanded(item.label)} onMouseLeave={() => setExpanded(null)}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setExpanded(null); }}>
        <button type="button" data-dropdown={item.label} aria-expanded={expanded === item.label} aria-controls={`nav-${item.label.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setExpanded(expanded === item.label ? null : item.label)}>{item.label}<svg aria-hidden="true" viewBox="0 0 12 8"><path d="m1 1 5 5 5-5" /></svg></button>
        <div id={`nav-${item.label.toLowerCase().replaceAll(" ", "-")}`} className="dropdown-links" hidden={expanded !== item.label}>
          {item.children.map((child) => <a key={child.label} href={child.href} onClick={() => setExpanded(null)}>{child.label}</a>)}
        </div>
      </div> : item.dialog ? <button key={item.label} type="button" aria-haspopup="dialog" onClick={() => context?.open(item.dialog!)}>{item.label}</button> : <a key={item.label} href={item.href}>{item.label}</a>)}
      {theme === "maya" ? <Action dialog="consultation" oval>Let’s connect</Action> : <Action href="https://www.conejovalleycounseling.com/contact" oval>Contact</Action>}
    </nav>
    <button type="button" className="menu-toggle" aria-label="Open navigation menu" aria-haspopup="dialog" onClick={() => context?.open("menu")}><span /><span /></button>
  </>;
}
