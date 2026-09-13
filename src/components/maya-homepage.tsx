import { HomePage } from "@/components/homepage";
import { Action } from "@/components/interactions";
import { Photo } from "@/components/photo";
import { mayaContactHref } from "@/content/navigation";
import type { Copy, ImageContent, MayaHomepageContent, RichText } from "@/content/types";
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

function ImageFrame({ image, className = "", sizes }: {
  image: ImageContent; className?: string; sizes: string;
}) {
  return <div className={`${styles.photo} ${className}`}>
    <Photo src={image.src} alt={image.alt} sizes={sizes} objectPosition={image.position} />
  </div>;
}

/** Reuse the template's compositions; Our Office is the only custom section. */
export function MayaHomePage({ content }: { content: MayaHomepageContent }) {
  return <HomePage content={content} theme="maya" className={styles.homepage} officeSection={
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
          <Action href={mayaContactHref} className={styles.officeLink}>Book an appointment<Arrow /></Action>
        </div>
      </div>
    </section>
  } />;
}
