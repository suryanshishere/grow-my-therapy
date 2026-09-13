import type { HomepageContent } from "./types";

const reference = "https://www.conejovalleycounseling.com";
const contactHref = "/original/contact/";
const href = (path: string) => `${reference}${path}`;
const image = (name: string, alt: string, position = "50% 50%") => ({ src: `/images/original-${name}.webp`, alt, position });

export const originalContent: HomepageContent = {
  hero: {
    eyebrow: "Online & in-person counseling in Newbury Park & across CA",
    title: [{ text: "Rebuild your foundation on solid ground and finally begin to " }, { text: "thrive", accent: true }, { text: "." }],
    description: "Specialized therapy for adults, couples, teens, and children to reflect, heal, and grow.",
    action: { label: "Book an Appointment", href: contactHref },
    image: image("hero", "A family enjoying a peaceful afternoon together at the beach"),
    sideImage: image("hero-side", "A child exploring the water's edge", "87.3% 56%"),
  },
  intro: {
    title: "You’re holding onto hope that life can be better than it is right now.",
    lead: "At Conejo Valley Family Counseling we want to make that hope a reality.",
    body: "Whether you're an adult seeking personal growth, looking to work through your trauma, a couple working on your relationship, or a parent looking for support for your child, we provide a compassionate and safe space to help you navigate all of life’s ups and downs.",
    secondaryBody: "First and foremost, we believe what you’re going through is real, valid, and worthy of support. Our team offers clients in the Newbury Park area and across CA an environment to discover a new life and a deeper sense of self in the midst of their struggles. As we tap into the power of connection and understanding, you can find your footing again and take a transformative path forward.",
    image: image("intro", "Gentle ocean waves meeting a sandy beach under a cloudy sky"),
  },
  services: {
    title: [{ text: "Who we " }, { text: "help", accent: true }],
    cards: [
      { title: "Adults", body: "Feeling stuck or overwhelmed? We help adults find clarity, build resilience, and move forward with confidence by addressing the root causes of anxiety, stress, and emotional pain.", image: image("individuals", "Two people sitting on a log beside the ocean", "51.2% 64.8%") },
      { title: "Couples", body: "Relationships require effort, and we’re here to help you strengthen yours. We guide couples through challenges like communication breakdowns and trust issues, helping you rebuild intimacy and strengthen your relationship.", image: image("couples", "A couple embracing and smiling together on the beach"), action: { label: "Couples", href: href("/couples-therapy") } },
      { title: "Children & Teens", body: "Kids need support, too. We help them process big emotions, cope with challenging family situations, build coping skills, and feel understood, while also working closely with their parents to create a nurturing environment.", image: image("teens", "Two children playing together on the shoreline"), action: { label: "Children & Teens", href: href("/children-and-teens") } },
    ],
  },
  statement: {
    title: [{ text: "You deserve a place where your story is heard, valued, and understood. " }, { text: "Nothing will be too heavy for us to carry together.", italic: true }],
    image: image("banner", "Children playing on a broad, quiet beach"),
  },
  expertise: {
    title: [{ text: "Our areas of " }, { text: "expertise", accent: true }],
    items: [
      { label: "Dissociation", href: href("/dissociative-identity-disorder-therapist-newbury-park") },
      { label: "Trauma", href: href("/trauma-counseling-newbury-park") },
      { label: "Family conflict" },
      { label: "Special needs parenting", href: href("/counseling-special-needs-parents-newbury-park") },
      { label: "Depression", href: href("/anxiety-depression") },
      { label: "Marriage", href: href("/couples-therapy") },
      { label: "Anxiety", href: href("/anxiety-depression") },
      { label: "Relationships" },
      { label: "Children", href: href("/children-and-teens") },
      { label: "Teens", href: href("/children-and-teens") },
      { label: "Intimacy & connection", href: href("/couples-therapy") },
      { label: "…and more." },
    ],
  },
  approach: {
    eyebrow: "How we work",
    title: "We’re here to make a difference.",
    lead: "The clients we work with are balancing so many things at once, it’s often hard for them to put themselves first.",
    body: "Here, your needs are always top priority. Our team takes the time to deeply listen to our clients in order to truly understand their story and their struggles. We recognize that no two people are the same and that personalized therapy means an intentional, tailored approach. (You won’t find anything “one-size-fits-all” here.) If you’re ready to do the work, we’re ready to help.",
    secondaryBody: "Sometimes we may gently challenge you to look at things differently and other times we may explore your emotions, all while encouraging you to practice what you’ve learned in your daily life. We take what we do seriously because we know how important it is for you to heal from what’s hurting you, discover a fulfilling life, and build meaningful relationships. Our goal is to walk alongside you in this journey, offering support and guidance as you uncover your strengths and embrace what the future can hold for you.",
    image: image("approach", "A woman and a child dancing together on a sandy beach at sunset", "21.6259% 45.6029%"),
    action: { label: "Learn more about us", href: href("/therapists-newbury-park") },
  },
  bridge: {
    title: [{ text: "Honoring where you’ve been " }, { text: "&", accent: true }, { text: " helping shape where you’re headed." }],
    image: image("transition", "A family of four holding hands and looking toward the ocean"),
  },
  specialties: {
    title: [{ text: "Our " }, { text: "specialties", accent: true }, { text: " include…" }],
    items: [
      { title: "Trauma", body: "We don’t always know when and how we’ve experienced trauma. In therapy, we’ll work together to help you process your past, understand what’s causing you to stay “stuck,” and regain a sense of safety, control, and hope. You don’t have to carry your burdens alone.", action: { label: "Learn more", href: href("/trauma-counseling-newbury-park") } },
      { title: "Dissociation", body: "The feeling of losing time, hearing conflicting voices, or questioning your sense of self can be overwhelming. In therapy, we’ll help you understand these experiences, recognize your own triggers, and create a sense of balance and identity so that you can feel more grounded.", action: { label: "Learn more", href: href("/dissociative-identity-disorder-therapist-newbury-park") } },
      { title: "EMDR", body: "Eye Movement Desensitization and Reprocessing (EMDR) is a powerful therapeutic technique that helps process and heal trauma by reworking how painful memories are stored in your brain. This allows you to find relief and move toward lasting healing.", action: { label: "Learn more", href: href("/emdr-therapy-newbury-park") } },
      { title: "Special Needs Parenting", body: "Parenting a child with special needs presents unique challenges and complex emotions. We provide compassionate support through lived experience and expertise to help you navigate this journey with tools, understanding, and self-care.", action: { label: "Learn more", href: href("/counseling-special-needs-parents-newbury-park") } },
    ],
  },
  contact: {
    eyebrow: "Schedule an appointment",
    title: [{ text: "Find a therapist who is the right fit for  " }, { text: "you", accent: true }, { text: "." }],
    body: "Coming to therapy is a courageous decision, and connecting with the right kind of therapist makes all the difference. We understand that your journey is personal, and we're here to support you with care and understanding every step of the way. Each member of our team brings dedicated expertise and a commitment to support you in your struggles. We want you to feel prioritized, understood, and empowered.",
    prompt: "Click the button below to schedule an appointment.",
    action: { label: "Book now", href: contactHref },
    smallImage: image("closing-one", "A person picking up seashells in the sand"),
    largeImage: image("closing-two", "An adult and child discovering shells on the beach", "62.9% 52.8%"),
  },
};
