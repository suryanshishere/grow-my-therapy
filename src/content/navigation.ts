import type { Theme } from "./types";

export type NavigationItem = { label: string; href?: string; dialog?: "faq"; children?: NavigationItem[] };
const reference = "https://www.conejovalleycounseling.com";
/** The clone hosts its own recreation of the reference booking page. */
export const contactHref = "/original/contact/";
/** Maya's own booking page, styled in the redesign's theme. */
export const mayaContactHref = "/contact/";
export const navigation: Record<Theme, NavigationItem[]> = {
  maya: [
    // Rooted at "/" so the same links work from the booking page.
    { label: "Meet Maya", href: "/#about" },
    { label: "Services", href: "/#services", children: [
      { label: "Anxiety & panic", href: "/#service-1" },
      { label: "Trauma", href: "/#service-2" },
      { label: "Burnout & perfectionism", href: "/#service-3" },
    ] },
    { label: "Approach", href: "/#approach", children: [
      { label: "CBT", href: "/#method-1" },
      { label: "EMDR", href: "/#method-2" },
      { label: "Mindfulness", href: "/#method-3" },
      { label: "Body-oriented techniques", href: "/#method-4" },
    ] },
    { label: "Our office", href: "/#office" },
    { label: "FAQs", dialog: "faq" },
  ],
  original: [
    { label: "About", href: `${reference}/therapists-newbury-park` },
    { label: "Our Team", children: [
      { label: "Jennifer Anderson, LMFT", href: `${reference}/jennifer-anderson` },
      { label: "Candace Bletscher, AMFT", href: `${reference}/candace-bletscher` },
      { label: "Heather Williams-Baumgart, AMFT", href: `${reference}/heather-williams-baumgart` },
      { label: "Michaela Gorospe, AMFT", href: `${reference}/michaela-gorospe` },
      { label: "Samantha Johnson, AMFT", href: `${reference}/samantha-johnson` },
      { label: "Autumn Bodily, AMFT", href: `${reference}/autumn-bodily` },
      { label: "Andrea Watkins, APCC", href: `${reference}/andrea-watkins` },
      { label: "Rosa Gomez, AMFT", href: `${reference}/rosa-gomez` },
      { label: "Chad Flores, AMFT", href: `${reference}/chad-flores` },
    ] },
    { label: "Specialties", children: [
      { label: "Dissociation", href: `${reference}/dissociative-identity-disorder-therapist-newbury-park` },
      { label: "Trauma", href: `${reference}/trauma-counseling-newbury-park` },
      { label: "Special Needs Parenting", href: `${reference}/counseling-special-needs-parents-newbury-park` },
      { label: "Couples", href: `${reference}/couples-therapy` },
      { label: "Children & Teens", href: `${reference}/children-and-teens` },
      { label: "Anxiety & Depression", href: `${reference}/anxiety-depression` },
      { label: "Adoption", href: `${reference}/adoption-therapy-ventura-county-ca` },
    ] },
    { label: "Methods", children: [
      { label: "EMDR", href: `${reference}/emdr-therapy-newbury-park` },
      { label: "Brainspotting", href: `${reference}/brainspotting` },
      { label: "Somatic Therapy", href: `${reference}/somatic-therapy` },
      { label: "Parts Work Therapy", href: `${reference}/parts-work-therapy` },
    ] },
    { label: "FAQs", href: `${reference}/faqs` },
  ],
};

export const faqs = [
  { question: "Is this practice a fit for me?", answer: "I work with adults experiencing anxiety, panic, trauma, burnout, and perfectionism. Many are professionals, entrepreneurs, or creatives who keep functioning outwardly while feeling overwhelmed, exhausted, or disconnected. Our work makes room for both present concerns and the experiences beneath them." },
  { question: "Where can we meet?", answer: "In-person sessions take place in my quiet, private office in Santa Monica, CA 90401. Secure telehealth is also available for adults located in California. Both formats support the same thoughtful, collaborative approach." },
  { question: "What might our work involve?", answer: "We'll balance practical tools with space for reflection and depth. I draw on cognitive-behavioral therapy (CBT), EMDR, mindfulness-based practices, and body-oriented techniques to explore the emotional and physical sides of your experience. You're an active participant in the process." },
  { question: "How is trauma work paced?", answer: "I work with single-incident trauma and more complex, longstanding experiences, including those rooted in childhood, relationships, or chronic stress. We move carefully, with safety and stabilization guiding the work and attention to how you're feeling in sessions and in everyday life." },
];
