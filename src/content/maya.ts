import { mayaContactHref } from "./navigation";
import type { MayaHomepageContent } from "./types";

const image = (name: string, alt: string, position = "50% 50%") => ({
  src: `/images/maya-${name}.webp`,
  alt,
  position,
});

export const mayaContent: MayaHomepageContent = {
  hero: {
    eyebrow: "Adult therapy · Santa Monica & California telehealth",
    title: "Therapy for anxiety, trauma & burnout in Santa Monica.",
    description: "I'm Dr. Maya Reynolds, PsyD, a Licensed Clinical Psychologist. I offer adults a warm, collaborative space to understand what they're carrying, in person in Santa Monica or through secure telehealth across California.",
    action: { label: "Book an appointment", href: mayaContactHref },
    image: image("office-one", "Window light, a sofa, and an armchair in Maya's Santa Monica therapy office", "35% 50%"),
    sideImage: image("studio-statement", "A narrow detail of sunlight filtering through linen"),
  },
  intro: {
    title: [
      { text: "You can be capable " },
      { text: "and still need support.", italic: true },
    ],
    lead: "When keeping up takes everything",
    body: "You may be getting through the day, meeting expectations, and looking like you have it together. Inside, worry keeps circling. Your body feels tense, rest is difficult, or the pressure to keep going leaves you exhausted.",
    secondaryBody: "I work with adults who know this experience, including professionals, entrepreneurs, and creatives. Therapy offers room to slow down, understand the patterns beneath the pressure, and explore more sustainable ways of living and working.",
    image: image("studio-intro", "An unoccupied work desk beside a sunlit window", "72% 50%"),
  },
  services: {
    title: "Support for what you're carrying",
    cards: [
      {
        title: "Anxiety & panic",
        body: "Constant worry, overthinking, or panic can make it hard to feel at ease, even when life looks manageable from the outside. You might notice physical tension, difficulty sleeping, or a sense of being on edge. Together, we'll explore those patterns and bring practical tools to the emotional and physical experience of anxiety.",
        image: image("studio-anxiety", "Soft sunlight and shadows crossing a warm wall", "50% 35%"),
        action: { label: "Book an appointment", href: mayaContactHref },
      },
      {
        title: "Trauma",
        body: "A single event or longstanding experiences can continue to affect your relationships, confidence, and sense of safety. I work with both single-incident and more complex trauma, including experiences rooted in childhood, relationships, or chronic stress. Our work is carefully paced, with safety and stabilization guiding the process and room for your experience throughout.",
        image: image("studio-trauma", "An ivy-lined stone doorway opening onto a sheltered path", "50% 58%"),
        action: { label: "Book an appointment", href: mayaContactHref },
      },
      {
        title: "Burnout & perfectionism",
        body: "Years of pushing through stress can leave you exhausted, disconnected, and unsure what you need. For professionals, entrepreneurs, and creatives, high internal standards can make slowing down especially difficult. Therapy offers space to explore the pressure to keep performing, reconnect with yourself, and develop more sustainable ways of living and working.",
        image: image("studio-burnout", "A closed muted-plum notebook beside a ceramic cup", "50% 55%"),
        action: { label: "Book an appointment", href: mayaContactHref },
      },
    ],
  },
  statement: {
    title: [
      { text: "Room to slow down. " },
      { text: "Space to reconnect.", italic: true },
    ],
    image: image("studio-statement", "Leaf shadows falling across translucent linen"),
  },
  expertise: {
    title: "What brings you here?",
    items: [
      { label: "Constant worry", href: "#service-1" },
      { label: "Panic", href: "#service-1" },
      { label: "Overthinking", href: "#service-1" },
      { label: "Feeling on edge", href: "#service-1" },
      { label: "Past experiences", href: "#service-2" },
      { label: "Sense of safety", href: "#service-2" },
      { label: "Exhaustion", href: "#service-3" },
      { label: "Perfectionism", href: "#service-3" },
      { label: "Internal pressure", href: "#service-3" },
      { label: "Disconnection", href: "#service-3" },
    ],
  },
  approach: {
    eyebrow: "Meet your therapist",
    title: "I'm Dr. Maya Reynolds.",
    lead: "PsyD · Licensed Clinical Psychologist",
    body: "I work with adults navigating anxiety, trauma, and burnout, including thoughtful, capable people who feel stretched thin beneath the surface. My approach is warm, grounded, and collaborative. We make room for what feels difficult today and the experiences that have shaped it.",
    secondaryBody: "Our sessions balance structure and practical tools with reflection and depth. I want you to feel respected, understood, and actively involved as we explore both the emotional and physical sides of your experience, at a pace that makes room for you.",
    image: image("portrait", "Dr. Maya Reynolds, PsyD, Licensed Clinical Psychologist", "50% 35%"),
    action: { label: "Discover my approach", href: "#approach" },
  },
  office: {
    eyebrow: "Santa Monica, CA 90401",
    title: "Our Office — a quieter place to begin.",
    body: [
      "A quiet, private setting with natural light, comfortable seating, and an uncluttered feel. My Santa Monica office offers space to settle in, slow down, and turn your attention to yourself.",
      "We can meet here in person or through secure telehealth if you're located in California. Both formats make room for thoughtful, collaborative work.",
    ],
    details: ["Santa Monica, CA 90401", "In-person sessions", "Secure telehealth for adults in California"],
    images: [
      image("office-one", "Natural light and comfortable seating in Maya's Santa Monica therapy office"),
      image("office-two", "Seating and bookshelves in Maya's quiet, private counseling space"),
    ],
  },
  bridge: {
    title: [
      { text: "Practical tools. " },
      { text: "Space for deeper understanding." },
    ],
    image: image("studio-bridge", "Daylight through an open window and sheer curtains"),
  },
  specialties: {
    title: "An approach we shape together",
    items: [
      {
        title: "Cognitive-behavioral therapy",
        body: "CBT brings attention to the patterns connecting thoughts, feelings, and everyday experience. We combine practical tools with reflection to explore how those patterns show up in your life.",
        action: { label: "Questions about CBT", dialog: "faq" },
      },
      {
        title: "EMDR",
        body: "I draw on EMDR within carefully paced trauma work. Safety and stabilization guide our process, with attention to your experience and how you feel both in sessions and in daily life.",
        action: { label: "Questions about trauma work", dialog: "faq" },
      },
      {
        title: "Mindfulness-based practices",
        body: "Mindfulness offers room to notice your present experience. Alongside practical tools and deeper reflection, these practices bring attention to what you're feeling as we make space to slow down.",
        action: { label: "Questions about my approach", dialog: "faq" },
      },
      {
        title: "Body-oriented techniques",
        body: "Stress is felt in the body as well as the mind. Body-oriented techniques help us attend to that physical experience, alongside your thoughts and emotions, within a supportive and collaborative process.",
        action: { label: "Questions about my approach", dialog: "faq" },
      },
    ],
  },
  contact: {
    eyebrow: "In Santa Monica & online across California",
    title: "Begin with what you need.",
    body: "Anxiety, past experiences, or the pressure to keep going may have brought you here. Therapy offers space to understand what's happening and reconnect with yourself, with practical support and room for reflection.",
    prompt: "Learn about in-person sessions and secure California telehealth.",
    action: { label: "Book an appointment", href: mayaContactHref },
    smallImage: image("studio-closing", "A ceramic cup and saucer in window light", "30% 55%"),
    largeImage: image("studio-bridge", "An open window and sheer curtains in natural daylight"),
  },
};
