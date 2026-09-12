import type { CSSProperties } from "react";
import { Action } from "@/components/interactions";
import { Photo } from "@/components/photo";
import type { ActionContent, Copy, HomepageContent, ImageContent, RichText, Theme } from "@/content/types";
import "@/styles/homepage.css";

function Rich({ text }: { text: RichText }) {
  if (typeof text === "string") return text;
  return text.map((part, index) => (
    <span key={index} className={[part.accent ? "script-accent" : part.italic ? "heading-italic" : "", part.noWrap ? "keep-together" : ""].filter(Boolean).join(" ") || undefined}>
      {part.text}
    </span>
  ));
}

function Paragraphs({ copy }: { copy: Copy }) {
  const paragraphs = typeof copy === "string" ? [copy] : copy;
  return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
}

function ContentAction({ action, oval = false, className }: { action: ActionContent; oval?: boolean; className?: string }) {
  return (
    <Action href={action.href} dialog={action.dialog} ariaLabel={action.ariaLabel} oval={oval} className={className}>
      {action.label}
    </Action>
  );
}

function ImageFrame({ image, className, sizes = "(max-width: 767px) 88vw, 40vw", priority = false }: {
  image: ImageContent;
  className: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo-frame ${className}`}>
      <Photo src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} objectPosition={image.position} />
    </div>
  );
}

/** The same editorial section geometry serves both assignment versions. */
export function HomePage({ content, theme }: { content: HomepageContent; theme: Theme }) {
  const expertiseColumns = Math.ceil(content.expertise.items.length / 2);
  return (
    <main id="main-content" className={`homepage homepage--${theme}`}>
      <section className="hero-section editorial-grid" aria-labelledby="hero-heading">
        <p className="hero-eyebrow eyebrow">{content.hero.eyebrow}</p>
        <div className="hero-copy">
          <h1 id="hero-heading"><Rich text={content.hero.title} /></h1>
          <p>{content.hero.description}</p>
        </div>
        <div className="hero-action"><ContentAction action={content.hero.action} /></div>
        <ImageFrame image={content.hero.image} className="hero-image" sizes="(max-width: 767px) 72vw, 38vw" priority />
        <ImageFrame image={content.hero.sideImage} className="hero-side-image" sizes="(max-width: 767px) 16vw, 10vw" />
      </section>

      <section className="intro-section editorial-grid" aria-labelledby="intro-heading">
        <h2 id="intro-heading" className="intro-heading"><Rich text={content.intro.title} /></h2>
        <div className="intro-primary-copy">
          <p className="eyebrow">{content.intro.lead}</p>
          <Paragraphs copy={content.intro.body} />
        </div>
        <ImageFrame image={content.intro.image} className="intro-image" sizes="(max-width: 767px) 88vw, 32vw" />
        <div className="intro-secondary-copy"><Paragraphs copy={content.intro.secondaryBody} /></div>
      </section>

      <section id="services" className="services-section editorial-grid" aria-labelledby="services-heading">
        <h2 id="services-heading" className="services-heading"><Rich text={content.services.title} /></h2>
        {content.services.cards.map((card, index) => (
          <article id={`service-${index + 1}`} key={card.title} className={`service-card service-card--${index + 1}`}>
            <ImageFrame image={card.image} className="service-image" sizes="(max-width: 767px) 88vw, 29vw" />
            <div className="service-copy">
              <h3>
                {card.action ? <ContentAction action={{ ...card.action, label: card.title }} className="service-title-link" /> : card.title}
              </h3>
              <p>{card.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="statement-section editorial-grid" aria-labelledby="statement-heading">
        <ImageFrame image={content.statement.image} className="statement-image" sizes="100vw" />
        <div className="statement-shade" />
        <h2 id="statement-heading"><Rich text={content.statement.title} /></h2>
      </section>

      <section className="expertise-section editorial-grid" aria-labelledby="expertise-heading">
        <h2 id="expertise-heading" className="small-section-heading"><Rich text={content.expertise.title} /></h2>
        <ul className="expertise-list" style={{ "--expertise-rows": expertiseColumns } as CSSProperties}>
          {content.expertise.items.map((item, index) => (
            <li key={`${item.label}-${index}`} className={index === expertiseColumns - 1 || index === content.expertise.items.length - 1 ? "expertise-column-end" : undefined}>
              {item.href || item.dialog
                ? <Action href={item.href} dialog={item.dialog} className="expertise-link">{item.label}</Action>
                : <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="approach-section editorial-grid" aria-labelledby="approach-heading">
        <p className="approach-eyebrow eyebrow">{content.approach.eyebrow}</p>
        <h2 id="approach-heading" className="approach-heading"><Rich text={content.approach.title} /></h2>
        <ImageFrame image={content.approach.image} className="approach-image" sizes="(max-width: 767px) 88vw, 26vw" />
        <div className="approach-primary-copy">
          <p className="eyebrow">{content.approach.lead}</p>
          <Paragraphs copy={content.approach.body} />
        </div>
        <div className="approach-secondary-copy"><Paragraphs copy={content.approach.secondaryBody} /></div>
        <div className="approach-action"><ContentAction action={content.approach.action} /></div>
      </section>

      {content.office && (
        <section id="office" className="office-section editorial-grid" aria-labelledby="office-heading">
          <div className="office-heading-group">
            {content.office.eyebrow && <p className="eyebrow">{content.office.eyebrow}</p>}
            <h2 id="office-heading"><Rich text={content.office.title} /></h2>
          </div>
          <div className="office-copy">
            <Paragraphs copy={content.office.body} />
            {content.office.details && <ul className="office-details">{content.office.details.map(detail => <li key={detail}>{detail}</li>)}</ul>}
          </div>
          <div className="office-gallery">
            {content.office.images.map((image, index) => <ImageFrame key={image.src} image={image} className={`office-image office-image--${index + 1}`} sizes="(max-width: 767px) 88vw, 46vw" />)}
          </div>
        </section>
      )}

      <section className="bridge-section editorial-grid" aria-labelledby="bridge-heading">
        <ImageFrame image={content.bridge.image} className="bridge-image" sizes="(max-width: 767px) 94vw, 55vw" />
        <h2 id="bridge-heading"><Rich text={content.bridge.title} /></h2>
      </section>

      <section id="approach" className="specialties-section editorial-grid" aria-labelledby="specialties-heading">
        <h2 id="specialties-heading" className="small-section-heading"><Rich text={content.specialties.title} /></h2>
        {content.specialties.items.map((item, index) => (
          <article id={`method-${index + 1}`} key={item.title} className={`specialty-card specialty-card--${index + 1}`}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            {item.action && <ContentAction action={item.action} />}
          </article>
        ))}
      </section>

      <section id="contact" className="contact-section editorial-grid" aria-labelledby="contact-heading">
        <ImageFrame image={content.contact.smallImage} className="contact-small-image" sizes="(max-width: 767px) 50vw, 13vw" />
        <p className="contact-eyebrow eyebrow">{content.contact.eyebrow}</p>
        <h2 id="contact-heading"><Rich text={content.contact.title} /></h2>
        <div className="contact-copy">
          <Paragraphs copy={content.contact.body} />
          {content.contact.prompt && <p>{content.contact.prompt}</p>}
        </div>
        <div className="contact-action"><ContentAction action={content.contact.action} oval /></div>
        <ImageFrame image={content.contact.largeImage} className="contact-large-image" sizes="(max-width: 767px) 83vw, 36vw" />
      </section>
    </main>
  );
}
