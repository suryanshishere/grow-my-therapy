/**
 * The reference practice's intake form, reproduced field for field from
 * https://www.conejovalleycounseling.com/contact for the clone route. Labels, helper
 * text and option lists are verbatim. The clone never transmits or stores a submission.
 */

import type { RichText } from "./types";

export type ContactField =
  | { kind: "name"; id: string; label: string; parts: readonly { id: string; label: string; required: boolean }[] }
  | { kind: "text" | "email" | "tel" | "textarea"; id: string; label: string; required: boolean; helper?: string }
  | { kind: "select"; id: string; label: string; required: boolean; helper?: string; options: readonly string[] };

export const contactTitle: RichText = [{ text: "Get " }, { text: "in touch", accent: true }, { text: "." }];

export const contactIntro = {
  body: "Use this form to tell us more about what brings you to therapy. We’ll respond within 24 hours to match you with the therapist whose expertise and availability best aligns with your needs & goals.",
  address: ["925 Broadbeck Dr Suite 225", "Newbury Park, CA 91320"],
  email: "info@conejovalleycounseling.com",
  phone: { label: "805.242.3120", href: "tel:8052423120" },
} as const;

export const selectPlaceholder = "Select an option";

export const contactFields: readonly ContactField[] = [
  {
    kind: "name",
    id: "name",
    label: "Name",
    parts: [
      { id: "first-name", label: "First Name", required: true },
      { id: "last-name", label: "Last Name", required: true },
    ],
  },
  { kind: "email", id: "email", label: "Email", required: true },
  { kind: "tel", id: "phone", label: "Phone", required: true },
  {
    kind: "select",
    id: "format",
    label: "Are you looking for telehealth or in-person therapy?",
    required: true,
    options: ["Telehealth", "In-person", "Open to either"],
  },
  {
    kind: "select",
    id: "referral",
    label: "How did you hear about our practice?",
    required: true,
    options: ["Google search", "Psychology Today", "Referred by family/friend", "Referred by professional", "Insurance company list"],
  },
  {
    kind: "text",
    id: "insurance",
    label: "Please provide the name of your insurance company:",
    required: true,
    helper: "If you do not plan to use insurance, please write “None”.",
  },
  {
    kind: "textarea",
    id: "issues",
    label: "What are the presenting issues?",
    required: true,
    helper: "Note: Please do not provide any personal information in this form.",
  },
  { kind: "text", id: "minor-age", label: "If the counseling is for a minor, please provide their age:", required: false },
  {
    kind: "select",
    id: "clinician",
    label: "Are you interested in working with a particular clinician?",
    required: true,
    helper: "If so, choose their name below. If not, select “None.”",
    options: [
      "Jennifer Anderson",
      "Heather Williams-Baumgart",
      "Mary Pat Paulson",
      "Mandi Behzadi",
      "Michaela Gorospe",
      "Candace Bletscher",
      "Samantha Johnson",
      "Autumn Bodily",
      "Andrea Watkins",
      "Rosa Gomez",
      "None",
    ],
  },
  {
    kind: "text",
    id: "availability",
    label: "We see clients the same day and time each week. Please provide some consistent days and times that work for you:",
    required: true,
  },
];

/**
 * Maya's booking page. Same demonstration form, with the intake adapted to her adult
 * practice: no reference clinicians, insurance or minor's age. Nothing is sent or stored.
 */
export const mayaContactTitle: readonly { text: string; italic?: boolean }[] = [
  { text: "Book an " },
  { text: "appointment", italic: true },
  { text: "." },
];

export const mayaContactIntro = {
  eyebrow: "Santa Monica & California telehealth",
  body: "Tell me a little about what you're looking for and when you're usually free. We can meet in my Santa Monica office or through secure telehealth if you're located in California.",
  details: ["Santa Monica, CA 90401", "In-person sessions", "Secure telehealth across California"],
  note: "Dr. Maya Reynolds is a fictional therapist created for a design assignment. This form is a demonstration and does not send or store anything.",
} as const;

export const mayaContactFields: readonly ContactField[] = [
  {
    kind: "name",
    id: "name",
    label: "Name",
    parts: [
      { id: "first-name", label: "First Name", required: true },
      { id: "last-name", label: "Last Name", required: true },
    ],
  },
  { kind: "email", id: "email", label: "Email", required: true },
  { kind: "tel", id: "phone", label: "Phone", required: true },
  {
    kind: "select",
    id: "format",
    label: "Would you like to meet in person or online?",
    required: true,
    options: ["In person in Santa Monica", "Telehealth within California", "Open to either"],
  },
  {
    kind: "select",
    id: "referral",
    label: "How did you hear about Dr. Reynolds?",
    required: true,
    options: ["Search engine", "Psychology Today", "Friend or family", "Healthcare professional", "Other"],
  },
  {
    kind: "textarea",
    id: "issues",
    label: "What brings you to therapy?",
    required: true,
    helper: "Please don't include personal or health details in this form.",
  },
  { kind: "text", id: "availability", label: "Which days and times usually work for you?", required: true },
];
