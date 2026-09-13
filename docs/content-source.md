# Content and design sources

Dr. Maya Reynolds is the imaginary therapist specified in the assignment. Her [provided profile](https://docs.google.com/document/d/1-IJVKEjuqV9CTd9QH16UNHJ7SQfdiweS4oAIZ8vmgHU/edit) is the sole factual source for Maya's redesign. The [Conejo Valley Counseling homepage](https://www.conejovalleycounseling.com/home) supplies the clone's reference content and section sequence; it supplies no facts about Maya.

## Profile-to-page mapping

| Profile information | Use in Maya's redesign |
| --- | --- |
| Dr. Maya Reynolds, PsyD; Licensed Clinical Psychologist | Hero introduction, biography, portrait alternative text, and supporting practice information. |
| Adults experiencing anxiety, panic, trauma, burnout, and perfectionism | Local-search H1, introduction, and three service descriptions. |
| Professionals, creatives, and entrepreneurs | Audience language without implying that these are the only adults served. |
| Constant worry, overthinking, physical tension, sleep difficulties, and feeling on edge | Anxiety and panic description; recognition-oriented introduction and concern links. |
| Single-incident and complex, longstanding trauma rooted in childhood, relationships, or chronic stress | Trauma service description and FAQ. |
| Carefully paced trauma work emphasizing safety and stabilization | Trauma service, EMDR description, and trauma-pacing FAQ; no fixed timeline or promised result. |
| Burnout, perfectionism, high internal pressure, and disconnection after years of pushing through stress | Burnout service and invitation to explore more sustainable living and working. |
| Warm, grounded, collaborative work balancing structure, practical tools, reflection, and depth | Biography, bridge, four approach blocks, FAQs, and closing invitation. |
| CBT, EMDR, mindfulness-based practices, and body-oriented techniques | Four distinct approach descriptions, preserving their order and navigation anchors. |
| Quiet, private office with natural light and an uncluttered, comfortable setting | Our Office immediately after the biography. |
| Supplied portrait and two supplied office photographs | Biography portrait, hero office photograph, and both photographs in Our Office. |
| Santa Monica, CA 90401; in-person sessions and secure telehealth for clients located in California | Hero, office details, FAQs, session-options dialog, footer, and metadata. |

## Editorial choices and factual boundaries

- The H1 is “Therapy for anxiety, trauma & burnout in Santa Monica.” Location and specialty terms appear naturally elsewhere without repeating the full heading in every section.
- The visible location is “Santa Monica, CA 90401.” The source's malformed street address is omitted; no replacement street address is guessed.
- Three services organize profile-supported concerns: Anxiety & panic, Trauma, and Burnout & perfectionism. Each description is 45–65 words.
- Introduction, biography, supporting statements, navigation, actions, FAQs, dialogs, footer, image descriptions, and metadata are written for Maya. No reference-practice names or service claims are inherited.
- Supportive language describes the work without promising recovery, guaranteeing outcomes, or prescribing a number of sessions. Statements about clinical techniques remain within the profile's stated approach.
- The four FAQs address client fit, meeting formats, the collaborative approach, and trauma pacing. No fees, hours, current availability, insurance arrangements, testimonials, or contact details are invented.
- “Explore session options” opens an informational dialog describing in-person and secure California telehealth formats. The dialog discloses the fictional practice and does not collect information or book sessions.
- The footer also identifies the fictional assignment practice. The preview does not present itself as an operating therapy service.

## Sunlit Studio visual direction

- Maya's homepage uses the same nine section compositions, image counts, and desktop column placements as the reference clone. Our Office is the only additional homepage section; FAQs and session information remain in dialogs.
- Deep olive `#303B32`, warm stone `#E5DED2`, muted plum `#725569`, light `#F7F4ED`, pale plum `#E5DAE1`, and body ink `#292D28` form the new palette.
- Locally hosted Instrument Sans supports the H1, body, navigation, and controls. Locally hosted Newsreader is reserved for reflective headings. Desktop body text is 17–18px, mobile body text is 16px, navigation is 14px, and captions are at least 12px.
- Our Office introduces a warm stone panel beside the supplied office photographs, with an olive surround and a narrow plum edge. The hero retains the template's two-image composition. The office panel and photographs stack on phones.
- The profile portrait and both office photographs are retained. New licensed photography of daylight, sheltered spaces, and everyday work or reflection replaces the previous coastal stock set. These atmospheric images do not depict Maya's premises and must not be labeled as doing so.
- Asset source, license, and placement records are maintained in [image-sources.md](image-sources.md). Photography stays naturally colored, with responsive WebP variants served locally.
- The clone retains the reference content, photographs, and actual fonts. Maya extends the same homepage content contract with a required office section; both versions provide two opening and two closing photographs.

## Source and acceptance checks

Compare every visible factual claim with the supplied profile, including FAQs, session information, footer, metadata, and alternative text. Confirm that the three services, four modalities, two office photographs, portrait, local terms, and credentials match the source. Check that atmospheric photography is described literally and never attributed to the practice.

Visual and interaction checks are recorded in [validation.md](validation.md), including contrast, responsive layout, image loading, keyboard operation, reduced motion, and unchanged clone navigation.

## Cloned contact page

`/original/contact/` reproduces the reference practice's intake form for the clone route only. Its field labels, helper sentences, and select options come from [the reference contact page](https://www.conejovalleycounseling.com/contact) and are held separately in `src/content/contact.ts`.

The clinician list names real people at the reference practice. It is reproduced only to match the source and carries no claim about their availability. The form is inert: it has no submission action, issues no request, and retains nothing a visitor types. A completed submission displays a notice explaining this and points to the real practice's contact page.
