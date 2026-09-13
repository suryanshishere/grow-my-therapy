export type Theme = "original" | "maya";

export type RichText =
  | string
  | readonly { text: string; accent?: boolean; italic?: boolean; noWrap?: boolean }[];

export type Copy = string | readonly string[];

export interface ImageContent {
  src: string;
  alt: string;
  position?: string;
}

export interface ActionContent {
  label: string;
  href?: string;
  dialog?: "faq";
  ariaLabel?: string;
}

/** Presentation contract for the reference clone. */
export interface HomepageContent {
  hero: {
    eyebrow: string;
    title: RichText;
    description: string;
    action: ActionContent;
    image: ImageContent;
    sideImage: ImageContent;
  };
  intro: {
    title: RichText;
    lead: string;
    body: Copy;
    secondaryBody: Copy;
    image: ImageContent;
  };
  services: {
    title: RichText;
    cards: readonly {
      title: string;
      body: string;
      image: ImageContent;
      action?: ActionContent;
    }[];
  };
  statement: { title: RichText; image: ImageContent };
  expertise: {
    title: RichText;
    items: readonly { label: string; href?: string; dialog?: "faq" }[];
  };
  approach: {
    eyebrow: string;
    title: RichText;
    lead: string;
    body: Copy;
    secondaryBody: Copy;
    image: ImageContent;
    action: ActionContent;
  };
  office?: {
    eyebrow?: string;
    title: RichText;
    body: Copy;
    details?: readonly string[];
    images: readonly ImageContent[];
  };
  bridge: { title: RichText; image: ImageContent };
  specialties: {
    title: RichText;
    items: readonly { title: string; body: string; action?: ActionContent }[];
  };
  contact: {
    eyebrow: string;
    title: RichText;
    body: Copy;
    prompt?: string;
    action: ActionContent;
    smallImage: ImageContent;
    largeImage: ImageContent;
  };
}

/**
 * The redesign keeps the reference section order and image counts but composes each
 * section itself, so it carries the extra copy those layouts present.
 */
export interface MayaHomepageContent {
  hero: Omit<HomepageContent["hero"], "sideImage"> & { secondaryAction: ActionContent; detailImage: ImageContent };
  intro: HomepageContent["intro"] & { pullQuote: string };
  services: HomepageContent["services"] & { intro: string };
  statement: HomepageContent["statement"] & { supporting: string };
  expertise: {
    title: RichText;
    intro: string;
    groups: readonly { label: string; href: string; items: readonly { label: string; href: string }[] }[];
  };
  approach: HomepageContent["approach"] & { quote: string };
  office: Omit<NonNullable<HomepageContent["office"]>, "details"> & {
    captions: readonly string[];
    facts: readonly { label: string; value: string }[];
  };
  bridge: HomepageContent["bridge"] & { body: string };
  specialties: HomepageContent["specialties"] & { intro: string };
  contact: Omit<HomepageContent["contact"], "prompt"> & { steps: readonly string[]; secondaryAction: ActionContent };
}
