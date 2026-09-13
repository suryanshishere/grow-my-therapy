import { Action } from "@/components/interactions";
import { Photo } from "@/components/photo";
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

function ContentAction({ action, primary = false }: { action: ActionContent; primary?: boolean }) {
  return <Action {...action} className={primary ? styles.primaryAction : styles.textAction}>
    <span>{action.label}</span><Arrow />
  </Action>;
}

function ImageFrame({ image, className = "", sizes = "(max-width: 767px) 88vw, 45vw", priority = false }: {
  image: ImageContent; className?: string; sizes?: string; priority?: boolean;
}) {
  return <div className={`${styles.photo} ${className}`}>
    <Photo src={image.src} alt={image.alt} sizes={sizes} objectPosition={image.position} priority={priority} />
  </div>;
}

/** Maya has an independent composition; the original's geometry remains in HomePage. */
export function MayaHomePage({ content }: { content: MayaHomepageContent }) {
  return <main id="main-content" className={styles.homepage}>
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroGrid}>
        <div className={styles.heroPanel} data-reveal>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1 id="hero-heading"><Rich text={content.hero.title} /></h1>
          <p className={styles.heroDescription}>{content.hero.description}</p>
          <ContentAction action={content.hero.action} primary />
        </div>
        <figure className={styles.heroVisual}>
          <ImageFrame image={content.hero.image} className={styles.heroPhoto} sizes="(max-width: 767px) 100vw, 58vw" priority />
          <figcaption>In person in Santa Monica <span aria-hidden="true">·</span> Online across California</figcaption>
        </figure>
      </div>
    </section>

    <section className={`${styles.section} ${styles.intro}`} aria-labelledby="intro-heading">
      <div className={styles.introVisual}>
        <p className={styles.eyebrow}>{content.intro.lead}</p>
        <ImageFrame image={content.intro.image} className={styles.introPhoto} sizes="(max-width: 767px) 60vw, 25vw" />
      </div>
      <div className={styles.introCopy}>
        <h2 id="intro-heading"><Rich text={content.intro.title} /></h2>
        <div className={styles.introParagraphs}><Paragraphs copy={content.intro.body} /><Paragraphs copy={content.intro.secondaryBody} /></div>
      </div>
    </section>

    <section id="services" className={styles.services} aria-labelledby="services-heading">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Individual therapy for adults</p>
          <h2 id="services-heading"><Rich text={content.services.title} /></h2>
        </div>
        <div className={styles.servicesGrid}>
          {content.services.cards.map((card, index) => <article id={`service-${index + 1}`} className={styles.service} key={card.title}>
            <ImageFrame image={card.image} className={styles.servicePhoto} sizes="(max-width: 767px) 88vw, 29vw" />
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            {card.action && <ContentAction action={card.action} />}
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.statement} aria-labelledby="statement-heading">
      <div className={styles.statementInner}>
        <ImageFrame image={content.statement.image} className={styles.statementPhoto} sizes="(max-width: 767px) 35vw, 19vw" />
        <h2 id="statement-heading"><Rich text={content.statement.title} /></h2>
      </div>
    </section>

    <section className={`${styles.section} ${styles.expertise}`} aria-labelledby="expertise-heading">
      <h2 id="expertise-heading"><Rich text={content.expertise.title} /></h2>
      <ul className={styles.concerns}>
        {content.expertise.items.map(item => <li key={item.label}>
          <Action href={item.href} dialog={item.dialog} className={styles.concernLink}>{item.label}<Arrow /></Action>
        </li>)}
      </ul>
    </section>

    <section id="about" className={`${styles.section} ${styles.about}`} aria-labelledby="approach-heading">
      <ImageFrame image={content.approach.image} className={styles.portrait} sizes="(max-width: 767px) 88vw, 38vw" />
      <div className={styles.aboutCopy}>
        <p className={styles.eyebrow}>{content.approach.eyebrow}</p>
        <h2 id="approach-heading"><Rich text={content.approach.title} /></h2>
        <p className={styles.credential}>{content.approach.lead}</p>
        <div className={styles.prose}><Paragraphs copy={content.approach.body} /><Paragraphs copy={content.approach.secondaryBody} /></div>
        <ContentAction action={content.approach.action} />
      </div>
    </section>

    <section id="office" className={styles.office} aria-labelledby="office-heading">
      <div className={styles.officeGrid}>
        <div className={styles.officePanel}>
          <p className={styles.eyebrow}>{content.office.eyebrow}</p>
          <h2 id="office-heading"><Rich text={content.office.title} /></h2>
          <div className={styles.prose}><Paragraphs copy={content.office.body} /></div>
        </div>
        <figure className={styles.officeFirst}>
          <ImageFrame image={content.office.images[0]} className={styles.officePhoto} sizes="(max-width: 767px) 88vw, 52vw" />
          <figcaption>Natural light. Room to settle in.</figcaption>
        </figure>
        <figure className={styles.officeSecond}>
          <ImageFrame image={content.office.images[1]} className={styles.officePhoto} sizes="(max-width: 767px) 88vw, 45vw" />
          <figcaption>A comfortable, private space for in-person therapy.</figcaption>
        </figure>
        <div className={styles.officeDetails}>
          <p className={styles.eyebrow}>A space that meets you where you are</p>
          <ul>{content.office.details?.map(detail => <li key={detail}>{detail}</li>)}</ul>
          <Action dialog="consultation" className={styles.officeLink}>Explore session options<Arrow /></Action>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.bridge}`} aria-labelledby="bridge-heading">
      <ImageFrame image={content.bridge.image} className={styles.bridgePhoto} sizes="(max-width: 767px) 88vw, 38vw" />
      <h2 id="bridge-heading"><Rich text={content.bridge.title} /></h2>
    </section>

    <section id="approach" className={styles.methods} aria-labelledby="specialties-heading">
      <div className={styles.methodsGrid}>
        <div className={styles.methodsHeading}>
          <p className={styles.eyebrow}>Grounded in collaboration</p>
          <h2 id="specialties-heading"><Rich text={content.specialties.title} /></h2>
          <Action dialog="faq" className={styles.textAction}>Questions about therapy<Arrow /></Action>
        </div>
        <div className={styles.methodList}>
          {content.specialties.items.map((item, index) => <article id={`method-${index + 1}`} key={item.title} className={styles.method}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <div className={styles.contactGrid}>
        <ImageFrame image={content.contact.largeImage} className={styles.contactPhoto} sizes="(max-width: 767px) 45vw, 23vw" />
        <div className={styles.contactCopy}>
          <p className={styles.eyebrow}>{content.contact.eyebrow}</p>
          <h2 id="contact-heading"><Rich text={content.contact.title} /></h2>
          <div className={styles.prose}><Paragraphs copy={content.contact.body} /></div>
          <ContentAction action={content.contact.action} primary />
          {content.contact.prompt && <p className={styles.contactPrompt}>{content.contact.prompt}</p>}
        </div>
      </div>
    </section>
  </main>;
}
