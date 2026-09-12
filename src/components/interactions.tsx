"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { contactHref, faqs, navigation, type NavigationItem } from "@/content/navigation";
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
          <p className="eyebrow" id="dialog-title">Dr. Maya Reynolds</p>
          <nav aria-label="Mobile navigation" className="mobile-navigation">
            {navigation[theme].map((item) => item.children ? <details key={item.label}>
              <summary>{item.label}<span aria-hidden="true">+</span></summary>
              <div className="mobile-submenu">{item.children.map((child) => <MenuLink key={child.label} item={child} close={close} />)}</div>
            </details> : <MenuLink key={item.label} item={item} close={close} />)}
          </nav>
          <Action dialog="consultation" oval>Let’s connect</Action>
          <p className="menu-location">Santa Monica, CA · Online across California</p>
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

/** The source's folder marker: a 22-unit open arrow head, rotated per direction. */
function Chevron({ direction }: { direction: "forward" | "back" }) {
  return <span className={`overlay-chevron overlay-chevron--${direction}`} aria-hidden="true">
    <svg viewBox="0 0 22 22" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="0.5"><path d="M18 7L11 14L4 7" fill="none" /></svg>
  </span>;
}

/**
 * The reference clone's mobile navigation. Unlike Maya's modal dialog this is a plain
 * fixed panel rendered beneath the header, because the source keeps its logo in place and
 * morphs the burger itself into the close control. A modal <dialog> is promoted to the top
 * layer and would paint over both.
 */
function OverlayMenu({ open, folder, setFolder, close, burgerRef }: {
  open: boolean; folder: string | null; setFolder: (label: string | null) => void;
  close: () => void; burgerRef: RefObject<HTMLButtonElement | null>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const items = navigation.original;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const outside = Array.from(document.querySelectorAll<HTMLElement>("main, .practice-footer, .site-colophon, .version-switch"));
    outside.forEach((element) => element.setAttribute("inert", ""));
    // Stepping between panels makes the focused control inert, which drops focus to the
    // body, so Escape is handled on the document rather than by bubbling.
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      close();
      burgerRef.current?.focus();
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previousOverflow;
      outside.forEach((element) => element.removeAttribute("inert"));
    };
  }, [open, close, burgerRef]);

  // Move focus into whichever panel is showing, on open and on every step.
  useEffect(() => {
    if (!open) return;
    rootRef.current?.querySelector<HTMLElement>(".overlay-panel--active a, .overlay-panel--active button")?.focus();
  }, [open, folder]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const scope = event.currentTarget as HTMLElement;
    const focusable = [
      ...(burgerRef.current ? [burgerRef.current] : []),
      ...Array.from(scope.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")),
    ].filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  return <div ref={rootRef} className={`overlay-menu${open ? " overlay-menu--open" : ""}`} onKeyDown={onKeyDown} inert={!open}>
    <div className="overlay-menu-bg" />
    <nav className="overlay-menu-nav" aria-label="Site navigation">
      <div className={`overlay-panel${folder ? " overlay-panel--stepped" : " overlay-panel--active"}`} inert={Boolean(folder)}>
        <div className="overlay-list">
          {items.map((item) => item.children
            ? <button key={item.label} type="button" className="overlay-item overlay-item--folder" onClick={() => setFolder(item.label)}>
                <span>{item.label}</span><Chevron direction="forward" />
              </button>
            : <a key={item.label} className="overlay-item" href={item.href} onClick={close}>{item.label}</a>)}
        </div>
        <div className="overlay-cta"><a className="action-oval" href={contactHref} onClick={close}>Contact</a></div>
      </div>
      {items.filter((item) => item.children).map((item) => (
        <div key={item.label} className={`overlay-panel${folder === item.label ? " overlay-panel--active" : " overlay-panel--incoming"}`} inert={folder !== item.label}>
          <div className="overlay-list">
            <button type="button" className="overlay-item overlay-item--back" onClick={() => setFolder(null)}>
              <Chevron direction="back" /><span>Back</span>
            </button>
            {item.children!.map((child) => <a key={child.label} className="overlay-item" href={child.href} onClick={close}>{child.label}</a>)}
          </div>
        </div>
      ))}
    </nav>
  </div>;
}

export function HeaderNavigation({ theme }: { theme: Theme }) {
  const context = useContext(DialogContext);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [menu, setMenu] = useState<{ open: boolean; folder: string | null }>({ open: false, folder: null });
  const menuOpen = menu.open;
  const closeMenu = () => setMenu({ open: false, folder: null });
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const original = theme === "original";
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
      {original ? <Action href={contactHref} oval>Contact</Action> : <Action dialog="consultation" oval>Let’s connect</Action>}
    </nav>
    <button
      ref={burgerRef}
      type="button"
      className={`menu-toggle${menuOpen ? " menu-toggle--open" : ""}`}
      aria-label={original && menuOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={original ? menuOpen : undefined}
      aria-haspopup={original ? undefined : "dialog"}
      onClick={() => (original ? setMenu((value) => ({ open: !value.open, folder: null })) : context?.open("menu"))}
    >
      <span className="burger-box" aria-hidden="true"><span /><span /><span /></span>
    </button>
    {original && <OverlayMenu
      open={menuOpen}
      folder={menu.folder}
      setFolder={(folder) => setMenu((value) => ({ ...value, folder }))}
      close={closeMenu}
      burgerRef={burgerRef}
    />}
  </>;
}
