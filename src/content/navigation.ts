import type { Theme } from "./types";

export type NavigationItem = { label: string; href?: string; dialog?: "faq" | "consultation"; children?: NavigationItem[] };
const reference = "https://www.conejovalleycounseling.com";
export const navigation: Record<Theme, NavigationItem[]> = {
  maya: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services", children: [
      { label: "Anxiety & panic", href: "#service-1" },
      { label: "Trauma", href: "#service-2" },
      { label: "Burnout & perfectionism", href: "#service-3" },
    ] },
    { label: "Approach", href: "#approach", children: [
      { label: "CBT", href: "#method-1" },
      { label: "EMDR", href: "#method-2" },
      { label: "Mindfulness", href: "#method-3" },
      { label: "Body-oriented therapy", href: "#method-4" },
    ] },
    { label: "Our office", href: "#office" },
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
  { question: "Who do you work with?", answer: "I work with adults navigating anxiety, panic, trauma, and burnout. Many are thoughtful, high-achieving people, including professionals, entrepreneurs, and creatives, who feel overwhelmed or disconnected despite keeping up on the outside." },
  { question: "Can we meet in person or online?", answer: "My practice offers in-person therapy in Santa Monica and secure telehealth for clients located in California. Both formats offer space for collaborative, thoughtful work." },
  { question: "What is your approach to therapy?", answer: "My approach is warm, grounded, and collaborative. I integrate cognitive-behavioral therapy (CBT), EMDR, mindfulness-based practices, and body-oriented techniques. Sessions combine practical tools with room for reflection and depth." },
  { question: "How do you approach trauma work?", answer: "Trauma work is carefully paced, with an emphasis on safety and stabilization. I work with both single-incident trauma and more complex, long-standing experiences, helping clients feel more regulated in everyday life as well as during sessions." },
];
