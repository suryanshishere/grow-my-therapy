import type { HomepageContent } from "./types";

const image = (name: string, alt: string, position = "50% 50%") => ({
  src: `/images/maya-${name}.webp`,
  alt,
  position,
});

export const mayaContent: HomepageContent = {
  hero: {
    eyebrow: "Adult therapy · Santa Monica & online across California",
    title: [
      { text: "Anxiety and " },
      { text: "trauma therapy", italic: true },
      { text: " in\u00a0" },
      { text: "Santa Monica, CA", noWrap: true },
    ],
    description: "A warm, collaborative space to work through anxiety, trauma, and burnout. Find room to slow down, understand what you're carrying, and reconnect with yourself.",
    action: { label: "Explore working together", dialog: "consultation" },
    image: image("hero", "Quiet blue ocean stretching toward a soft horizon"),
    sideImage: image("hero-side", "Ocean waves meeting a sandy California shoreline", "55% 50%"),
  },
  intro: {
    title: [
      { text: "You keep showing up. " },
      { text: "But inside, it feels like a lot.", italic: true },
    ],
    lead: "A little room to exhale",
    body: [
      "From the outside, you may seem capable and composed. You're meeting expectations, thinking ahead, and keeping things moving. Inside, your thoughts might be racing. You may feel overwhelmed, on edge, or disconnected from yourself, even when there's no obvious reason to stop.",
      "Perhaps you've become so used to pushing through that it's hard to recognize what you need. Therapy offers space to pay attention to that experience with curiosity and care.",
    ],
    secondaryBody: [
      "I work with adults navigating anxiety, trauma, burnout, and the pressure to get everything right. Many are professionals, creatives, and entrepreneurs who carry a great deal while rarely making room for themselves.",
      "Our work can hold both what is difficult right now and the experiences that have shaped it. You don't need to have everything figured out before you begin.",
    ],
    image: image("intro", "Soft dune grasses overlooking the ocean"),
  },
  services: {
    title: [{ text: "Support for what " }, { text: "you're carrying", italic: true }],
    cards: [
      {
        title: "Anxiety & panic",
        body: "When your mind keeps circling back to what could go wrong, it can be difficult to feel present. Anxiety and panic may leave you feeling on edge even while you continue with daily life. Together, we'll make room to understand those patterns and explore practical ways to respond with more awareness and steadiness.",
        image: image("anxiety", "Deep blue ocean rippling in the light"),
        action: { label: "Explore anxiety support", dialog: "consultation" },
      },
      {
        title: "Trauma",
        body: "Past experiences can continue to shape how you feel in the present. Trauma work here is carefully paced, with attention to safety and stabilization. We'll take time to understand what you're bringing into therapy and work collaboratively, making space for your experience without asking you to move faster than feels manageable.",
        image: image("trauma", "A sandy path winding gently through coastal dunes"),
        action: { label: "Explore trauma support", dialog: "consultation" },
      },
      {
        title: "Burnout & perfectionism",
        body: "Always doing more can leave little room to notice how you're feeling. You may be meeting every expectation while feeling exhausted or disconnected underneath. Therapy offers a place to explore the pressure to perform, the patterns that keep you pushing, and what it might mean to approach yourself with greater understanding.",
        image: image("burnout", "Muted green eucalyptus leaves in soft light"),
        action: { label: "Explore burnout support", dialog: "consultation" },
      },
    ],
  },
  statement: {
    title: [
      { text: "There's room to slow down. " },
      { text: "And space to reconnect with yourself.", italic: true },
    ],
    image: image("banner", "An overhead view of surf washing across the shore", "50% 55%"),
  },
  expertise: {
    title: [{ text: "A place for " }, { text: "all of this", italic: true }],
    items: [
      { label: "Anxiety", href: "#service-1" },
      { label: "Panic", href: "#service-1" },
      { label: "Overthinking", href: "#service-1" },
      { label: "Feeling on edge", href: "#service-1" },
      { label: "Trauma", href: "#service-2" },
      { label: "Past experiences", href: "#service-2" },
      { label: "Burnout", href: "#service-3" },
      { label: "Perfectionism", href: "#service-3" },
      { label: "Constant pressure", href: "#service-3" },
      { label: "Feeling disconnected", href: "#service-3" },
    ],
  },
  approach: {
    eyebrow: "Meet Dr. Maya Reynolds",
    title: [{ text: "Therapy that makes room " }, { text: "for you.", italic: true }],
    lead: "Warm, grounded, collaborative",
    body: [
      "I'm Dr. Maya Reynolds. I work with adults who are navigating anxiety, trauma, and burnout, including people who are used to being the capable one. My approach is warm and collaborative, with attention to both your immediate concerns and the experiences beneath them.",
      "I bring structure and practical tools to our sessions while leaving space for reflection and depth. We'll pay attention to what you're experiencing and explore it together, rather than expecting you to have the right words from the start.",
    ],
    secondaryBody: [
      "I draw on cognitive-behavioral therapy, EMDR, mindfulness-based practices, and body-oriented techniques. Our work considers your thoughts and emotions alongside the ways stress can show up in your body.",
      "For trauma work, pacing matters. Safety and stabilization guide the process, and your experience remains part of the conversation. My intention is for you to feel respected, understood, and actively involved in the work we do together.",
    ],
    image: image("portrait", "Dr. Maya Reynolds", "50% 35%"),
    action: { label: "Get to know my approach", href: "#approach" },
  },
  office: {
    eyebrow: "Santa Monica, California",
    title: [{ text: "Our Office. " }, { text: "Room to settle in.", italic: true }],
    body: [
      "A quiet, private space can make it a little easier to turn your attention inward. My Santa Monica office has natural light, a comfortable setting, and an uncluttered feel, with room to pause and be present.",
      "These photographs offer a look at the space where in-person sessions take place. If meeting online suits your circumstances, telehealth is also available for clients located in California. Both formats make room for thoughtful, collaborative therapy.",
    ],
    details: ["Santa Monica, CA 90401", "In-person sessions", "Telehealth across California"],
    images: [
      image("office-one", "Natural light and comfortable seating in Maya's Santa Monica therapy office"),
      image("office-two", "A second view of Maya's quiet, uncluttered counseling space"),
    ],
  },
  bridge: {
    title: [
      { text: "Feel respected. Feel understood. " },
      { text: "Be part of the process.", italic: true },
    ],
    image: image("transition", "A green coastal headland curving around a quiet ocean cove"),
  },
  specialties: {
    title: [{ text: "How we can " }, { text: "work together", italic: true }],
    items: [
      {
        title: "Cognitive-behavioral therapy",
        body: "CBT is one of the approaches I draw on as we explore your thoughts, feelings, and patterns. Sessions combine reflection with practical tools, making space to understand what you're experiencing and how it connects with everyday life.",
        action: { label: "Questions about therapy", dialog: "faq" },
      },
      {
        title: "EMDR",
        body: "EMDR is part of my approach to trauma work. We consider it within a collaborative process that gives attention to safety and stabilization. Your pace matters, and the work makes room for what you need along the way.",
        action: { label: "About trauma work", dialog: "faq" },
      },
      {
        title: "Mindfulness",
        body: "Mindfulness-based practices bring attention to your present experience. In our work, there's room to notice what you're thinking and feeling with curiosity. These practices sit alongside reflection and practical tools as part of an integrated approach.",
        action: { label: "Explore my approach", dialog: "faq" },
      },
      {
        title: "Body-oriented techniques",
        body: "Your experience includes more than your thoughts. I incorporate body-oriented techniques alongside other approaches, making space to notice the physical side of stress and emotion. This work is collaborative and stays attentive to your comfort and pace.",
        action: { label: "Explore my approach", dialog: "faq" },
      },
    ],
  },
  contact: {
    eyebrow: "A little space for yourself",
    title: [{ text: "You can begin " }, { text: "where you are.", italic: true }],
    body: "Whether you're navigating anxiety, carrying difficult experiences, or feeling worn down by constant pressure, therapy can offer a place to explore what's happening. Learn more about working together in Santa Monica or online across California, at a pace that leaves room for you.",
    prompt: "Explore the session options, or visit the FAQs to get a sense of the work.",
    action: { label: "Let's explore", dialog: "consultation" },
    smallImage: image("closing-one", "Soft waves washing onto sand in warm evening light"),
    largeImage: image("closing-two", "A calm ocean horizon beneath an open sky", "50% 35%"),
  },
};
