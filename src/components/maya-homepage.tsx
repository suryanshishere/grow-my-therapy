import { Action } from "@/components/interactions";
import { Photo } from "@/components/photo";
import { ScrollReveal } from "@/components/scroll-reveal";
import { mayaContactHref } from "@/content/navigation";
import type { ActionContent, Copy, ImageContent, MayaHomepageContent, RichText } from "@/content/types";
import styles from "@/styles/maya-homepage.module.css";

function Rich({ text }: { text: RichText }) {
  if (typeof text === "string") return text;
  return text.map((part, index) => part.italic || part.accent
    ? <em key={index}>{part.text}</em>
    : <span key={index}>{part.text}</span>);
}

function Paragraphs({ copy }: { copy: Copy }) {
  return (typeof copy === "string" ? [copy] : copy).map(paragraph => <p key={paragraph}>{paragraph}</p>);
}

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" /></svg>;
}

/** Every photograph sits in an aspect-ratio frame, so crops are set per placement. */
function Frame({ image, className = "", sizes, priority = false, reveal = false }: {
  image: ImageContent; className?: string; sizes: string; priority?: boolean; reveal?: boolean;
}) {
  return <div className={`${styles.frame} ${className}`} data-reveal={reveal ? "" : undefined}>
    <Photo src={image.src} alt={image.alt} sizes={sizes} priority={priority} objectPosition={image.position} />
  </div>;
}

function ContentAction({ action, className, oval = false }: { action: ActionContent; className?: string; oval?: boolean }) {
  return <Action href={action.href} dialog={action.dialog} ariaLabel={action.ariaLabel} className={className} oval={oval}>{action.label}</Action>;
}

const numeral = (index: number) => String(index + 1).padStart(2, "0");

/**
 * Maya's homepage keeps the reference section order and image counts, with Our Office after
 * the biography, but composes each section as one continuous story in daylight.
 */
export function MayaHomePage({ content }: { content: MayaHomepageContent }) {
  const { hero, intro, services, statement, expertise, approach, office, bridge, specialties, contact } = content;
  return <main id="main-content" className={styles.page}>
    <ScrollReveal rootId="main-content" />

    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy} data-reveal="">
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="hero-heading"><Rich text={hero.title} /></h1>
          <p className={styles.heroLead}>{hero.description}</p>
          <div className={styles.actions}>
            <ContentAction action={hero.action} oval />
            <ContentAction action={hero.secondaryAction} className={styles.textLink} />
          </div>
        </div>
        <div className={styles.heroMedia} data-reveal="">
          <Frame image={hero.image} className={styles.heroPhoto} sizes="(max-width: 767px) 88vw, (max-width: 1023px) 70vw, 40vw" priority />
          <Frame image={hero.detailImage} className={styles.heroDetail} sizes="(max-width: 1023px) 34vw, 17vw" priority />
        </div>
      </div>
    </section>

    <section className={styles.intro} aria-labelledby="intro-heading">
      <div className={styles.container}>
        <h2 id="intro-heading" className={styles.introHeading} data-reveal=""><Rich text={intro.title} /></h2>
        <div className={styles.introGrid}>
          <Frame image={intro.image} className={styles.introPhoto} sizes="(max-width: 1023px) 88vw, 48vw" reveal />
          <div className={styles.introCopy} data-reveal="">
            <p className={styles.eyebrow}>{intro.lead}</p>
            <div className={styles.prose}><Paragraphs copy={intro.body} /></div>
            <blockquote className={styles.pullQuote}><p>{intro.pullQuote}</p></blockquote>
            <div className={styles.prose}><Paragraphs copy={intro.secondaryBody} /></div>
          </div>
        </div>
      </div>
    </section>

    <section id="services" className={styles.services} aria-labelledby="services-heading">
      <div className={styles.container}>
        <header className={styles.sectionHeader} data-reveal="">
          <h2 id="services-heading"><Rich text={services.title} /></h2>
          <p>{services.intro}</p>
        </header>
        <div className={styles.serviceList}>
          {services.cards.map((card, index) => <article id={`service-${index + 1}`} key={card.title} className={styles.service}>
            <Frame image={card.image} className={styles.servicePhoto} sizes="(max-width: 767px) 88vw, 36vw" reveal />
            <div className={styles.serviceCopy} data-reveal="">
              <p className={styles.numeral}>{numeral(index)}</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              {card.action && <ContentAction action={card.action} className={styles.textLink} />}
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.statement} aria-labelledby="statement-heading">
      <Frame image={statement.image} className={styles.statementPhoto} sizes="100vw" reveal />
      <div className={`${styles.container} ${styles.statementCopy}`} data-reveal="">
        <h2 id="statement-heading"><Rich text={statement.title} /></h2>
        <p>{statement.supporting}</p>
      </div>
    </section>

    <section className={styles.expertise} aria-labelledby="expertise-heading">
      <div className={`${styles.container} ${styles.expertiseGrid}`}>
        <header className={styles.expertiseHeader} data-reveal="">
          <h2 id="expertise-heading"><Rich text={expertise.title} /></h2>
          <p>{expertise.intro}</p>
        </header>
        <div className={styles.concernGroups}>
          {expertise.groups.map(group => <div key={group.label} className={styles.concernGroup} data-reveal="">
            <a href={group.href} className={styles.concernLabel}>{group.label}<Arrow /></a>
            <ul className={styles.chips}>
              {group.items.map(item => <li key={item.label}><a href={item.href}>{item.label}</a></li>)}
            </ul>
          </div>)}
        </div>
      </div>
    </section>

    <section id="about" className={styles.about} aria-labelledby="approach-heading">
      <div className={`${styles.container} ${styles.aboutGrid}`}>
        <figure className={styles.portrait} data-reveal="">
          <Frame image={approach.image} className={styles.portraitPhoto} sizes="(max-width: 1023px) 88vw, 38vw" />
          <figcaption className={styles.credential}><strong>Dr. Maya Reynolds</strong><span>{approach.lead}</span></figcaption>
        </figure>
        <div className={styles.aboutCopy} data-reveal="">
          <p className={styles.eyebrow}>{approach.eyebrow}</p>
          <h2 id="approach-heading"><Rich text={approach.title} /></h2>
          <p className={styles.aboutQuote}>{approach.quote}</p>
          <div className={styles.prose}><Paragraphs copy={approach.body} /><Paragraphs copy={approach.secondaryBody} /></div>
          <ContentAction action={approach.action} className={styles.textLink} />
        </div>
      </div>
    </section>

    <section id="office" className={styles.office} aria-labelledby="office-heading">
      <div className={styles.container}>
        <header className={styles.officeHeader} data-reveal="">
          <div>
            <p className={styles.eyebrow}>{office.eyebrow}</p>
            <h2 id="office-heading"><Rich text={office.title} /></h2>
          </div>
          <div className={styles.prose}><Paragraphs copy={office.body} /></div>
        </header>
        <div className={styles.officeGallery}>
          {office.images.map((image, index) => <figure key={image.src} className={index === 0 ? styles.officeMain : styles.officeSide} data-reveal="">
            <Frame image={image} className={styles.officePhoto} sizes={index === 0 ? "(max-width: 767px) 88vw, 54vw" : "(max-width: 767px) 88vw, 38vw"} />
            <figcaption>{office.captions[index]}</figcaption>
          </figure>)}
        </div>
        <div className={styles.officeFacts} data-reveal="">
          <dl>
            {office.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
          </dl>
          <Action href={mayaContactHref} oval>Book an appointment</Action>
        </div>
      </div>
    </section>

    <section className={styles.bridge} aria-labelledby="bridge-heading">
      <div className={`${styles.container} ${styles.bridgeGrid}`}>
        <Frame image={bridge.image} className={styles.bridgePhoto} sizes="(max-width: 1023px) 88vw, 38vw" reveal />
        <div className={styles.bridgeCopy} data-reveal="">
          <h2 id="bridge-heading"><Rich text={bridge.title} /></h2>
          <p>{bridge.body}</p>
        </div>
      </div>
    </section>

    <section id="approach" className={styles.specialties} aria-labelledby="specialties-heading">
      <div className={`${styles.container} ${styles.specialtiesGrid}`}>
        <header className={styles.specialtiesHeader}>
          <div data-reveal="">
            <h2 id="specialties-heading"><Rich text={specialties.title} /></h2>
            <p>{specialties.intro}</p>
          </div>
        </header>
        <div className={styles.methods}>
          {specialties.items.map((item, index) => <article id={`method-${index + 1}`} key={item.title} className={styles.method} data-reveal="">
            <p className={styles.numeral}>{numeral(index)}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            {item.action && <ContentAction action={item.action} className={styles.textLink} />}
          </article>)}
        </div>
      </div>
    </section>

    <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <div className={`${styles.container} ${styles.contactGrid}`}>
        <div className={styles.contactMedia} data-reveal="">
          <Frame image={contact.largeImage} className={styles.contactPhoto} sizes="(max-width: 1023px) 76vw, 40vw" />
          <Frame image={contact.smallImage} className={styles.contactDetail} sizes="(max-width: 1023px) 36vw, 18vw" />
        </div>
        <div className={styles.contactCopy} data-reveal="">
          <p className={styles.eyebrow}>{contact.eyebrow}</p>
          <h2 id="contact-heading"><Rich text={contact.title} /></h2>
          <div className={styles.prose}><Paragraphs copy={contact.body} /></div>
          <ol className={styles.steps}>
            {contact.steps.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span>{step}</li>)}
          </ol>
          <div className={styles.actions}>
            <ContentAction action={contact.action} oval />
            <ContentAction action={contact.secondaryAction} className={styles.textLink} />
          </div>
        </div>
      </div>
    </section>
  </main>;
}
