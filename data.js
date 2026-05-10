// Project + about data for Victoria Dimitrova's portfolio.
// Edit here to update content across the site.

export const VICO_DATA = {
  name: "Victoria Dimitrova",
  role: "Graphic Designer",
  location: "Sofia, Bulgaria",
  oneLiner: "Graphic Designer at Bulgaria's leading marketing agency.",
  email: "vic.g.dimitrova@gmail.com",
  socials: [
    { label: "Behance",  href: "https://www.behance.net/victoria_dimitrova", handle: "Victoria Dimitrova" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/victoria-dimitrova-vico/", handle: "victoria-dimitrova" },
  ],

  // Active projects — real work only, irregular grid.
  // span values are CSS grid columns out of 12.
  // Layout: 3 rows of 2 — landscape + portrait pairing per row.
  projects: [
    // ── Row 1 ─────────────────────────────────────────
    {
      id: "Smart_Collagene_FIRST_PRESENTATION",
      title: "Smart Sisters - Collagen Powder",
      client: "Smart Sisters",
      year: "2026",
      tag: "Packaging Design",
      span: 5, col: 2, mt: 0,
      ratio: "5/4",
      tone: "warm",
      thumb: true,
      blurb: "Collagen, color, and a shelf presence that refuses to blend in.",
      services: ["Packaging Design", "Typography", "Color System"],
      role: "Graphic Designer",
      intro: "Smart Sisters is a wellness brand built for modern women who move fast and live intentionally. The collagen powder packaging was designed to stand out on shelf and screen - a bold color palette, clean typography, and a fresh visual language that bridges the gap between health and lifestyle. Every detail considered: from material finish to label hierarchy, the packaging feels as good as the product inside.",
    },
    {
      id: "TCC_Presentation",
      title: "Talyokova Collective Club",
      client: "Alexandra Talyokova",
      year: "2025",
      tag: "Brand Identity",
      span: 3, col: 8, mt: 10,
      ratio: "4/5",
      tone: "ink",
      thumb: true,
      blurb: "A brand identity for a dance collective that performs even on paper.",
      services: ["Brand Identity", "Logo Design"],
      role: "Graphic Designer",
      intro: "TCC - Talyokova Collective Club - is the creative umbrella behind Alexandra Talyokova's dance performances, events, and workshops. The brand was built to carry the energy of movement into every format - from stage print to digital - through a logo, mark, and color system designed in multiple creative variations. Flexible by nature, bold by design.",
    },
    // ── Row 2 ─────────────────────────────────────────
    {
      id: "Behance_DSK_Project",
      title: "DSK Bank - HERE & NOW",
      client: "DSK Bank",
      year: "2025",
      tag: "Campaign Materials · Marketing Design",
      span: 5, col: 1, mt: 6,
      ratio: "5/4",
      tone: "ink",
      imageExt: "jpg",
      thumb: true,
      blurb: "From stickers to spreads — DSK Bank's \"HERE & NOW\" campaign",
      services: ["Graphic Design", "Print & Digital Materials"],
      role: "Graphic Designer",
      intro: "A wide-ranging graphic design project for DSK Bank, spanning both print and digital marketing materials under the \"HERE & NOW\" campaign. Work included campaign visuals, event props, stickers, editorial layouts, and the design of the bank's seasonal payroll offer - all developed within the established brand visual identity to ensure consistency across channels.",
    },
    {
      id: "Behance_Olympus_Project_BoardGame",
      title: "Olympus - Magic School Board Game",
      client: "Olympus",
      year: "2025",
      tag: "Campaign Design · Board Game",
      span: 3, col: 10, mt: 0,
      ratio: "4/5",
      tone: "warm",
      thumb: true,
      blurb: "Logo, cards, and campaign visuals for a branded board game",
      services: ["Logo Design", "Card Design", "Social Media Visuals"],
      role: "Graphic Designer",
      intro: "I developed visual elements for \"Magic School\" — a branded board game designed to engage younger audiences. My work included the game's logotype, contributions to the card design, and social media communication assets, all executed within the established visual direction of the campaign.",
    },
    // ── Row 3 ─────────────────────────────────────────
    {
      id: "Oasis_Presentation",
      title: "Oasis - Poster Design",
      client: "Studio Karakashyan — Creative Production Company",
      year: "2026",
      tag: "Poster Series",
      span: 3, col: 2, mt: 2,
      ratio: "4/5",
      tone: "warm",
      imageExt: "jpg",
      thumb: true,
      blurb: "A dance performance, rendered in print and pixels.",
      services: ["Poster Design", "Logo Design", "Photo Retouching"],
      role: "Graphic Designer",
      intro: "Oasis is a contemporary dance performance exploring the pulse of friendship and the longing for human connection in a digitized world. A poster series drawn from the stage itself — each image pulled from live performance, retouched, and stilled into a moment that holds. Built around a modified geometric logotype and a considered color palette, the visual identity carries the tension of the performance from print to social.",
    },
    {
      id: "behance_3project_KrajmoriePristanishte",
      title: "Kraymorie Port - Brand Identity",
      client: "Kraymorie Port",
      year: "2023",
      tag: "Brand Identity",
      span: 4, col: 7, mt: 5,
      ratio: "5/4",
      tone: "ink",
      thumb: true,
      blurb: "A modern identity for a Black Sea port — where transportation meets the coast.",
      services: ["Logo Design", "Visual Identity"],
      role: "Graphic Designer",
      intro: "A complete visual identity for Kraymorie Port, located on the Bulgarian Black Sea coast. The goal was to create a modern, professional look that reflects the port's role as an important transportation and tourist hub.",
    },
    // ── Row 4 ─────────────────────────────────────────
    {
      id: "behance_2project_Ostatu4niObrazi",
      title: "Afterimage - Movie Poster Design",
      client: "Afterimage (Film)",
      year: "2022",
      tag: "Poster Design",
      span: 3, col: 1, mt: 8,
      ratio: "2/3",
      tone: "ink",
      thumb: true,
      blurb: "One image, one gesture — a poster that speaks before the film begins.",
      services: ["Poster Design", "Original Photography"],
      role: "Graphic Designer",
      intro: "An original poster for the film \"Afterimage,\" built around custom photography shot specifically for the project. The design uses a single symbolic image to capture the film's emotional core and the main character's internal struggle.",
    },
    {
      id: "viverra",
      title: "Viverra Specialty Coffee",
      client: "Viverra Coffee",
      year: "2024",
      tag: "Brand Identity · Packaging",
      span: 5, col: 8, mt: 2,
      ratio: "5/4",
      tone: "warm",
      imageExt: "jpg",
      thumb: true,
      blurb: "A specialty coffee brand with a wandering nose and a sharp eye.",
      services: ["Brand Identity", "Packaging", "Print"],
      role: "Lead Designer",
      intro: "Viverra is a specialty coffee roaster with a love for unusual origins and unforgiving flavor profiles. The brand needed a system as deliberate as a slow pour — confident in its mark, playful in its voice, ready to live across bags, cups, signage, and a café build-out in Sofia.",
    },
  ],

  // ped.ro-style about: a long passage where most text is blurred.
  // Blocks marked `start: true` are visible by default.
  // Pills inside a revealed block unlock further blocks (which may contain more pills).
  //
  // Discovery chain:
  //   "Sofia"  → city → click "window" → later → click "in" → dancing
  //   "fast"   → work → click "second" → artschool
  aboutBlocks: [
    {
      id: "intro",
      start: true,
      nodes: [
        "I'm Victoria — a designer in ",
        { pill: "SOFIA", label: "Sofia", unlocks: ["city"] },
        ". ",
      ],
    },
    {
      id: "city",
      nodes: [
        "The city feeds me details: wet cobblestones, buildings with character, evening light that makes concrete look beautiful. I walk more than I need to, stop in places I have no business stopping, walk into cafés just because I liked the ",
        { pill: "WINDOW", label: "window", unlocks: ["later"] },
        ". ",
      ],
    },
    {
      id: "later",
      nodes: [
        "All of it gets stored, for later. Later means a screen with Adobe open and several coffees in. ",
      ],
    },
    {
      id: "fast",
      start: true,
      nodes: [
        "I work fast without thinking ",
        { pill: "FAST", label: "fast", unlocks: ["work"] },
        ". ",
      ],
    },
    {
      id: "work",
      nodes: [
        "I do brand identities, campaigns, posters, illustration — things that sell, things that make you stop for a ",
        { pill: "SECOND", label: "second", unlocks: ["artschool", "dancing"] },
        ". ",
      ],
    },
    {
      id: "artschool",
      nodes: ["Art school, then straight into the deep end. "],
    },
    {
      id: "dancing",
      nodes: [
        "When I can't pick a typeface, I go dancing. No grid there. I've specialised in not being bored. ",
      ],
    },
    {
      id: "outro",
      start: true,
      nodes: [
        "Here for work? Drop a message. Here by accident? The coffee is for everyone.",
      ],
    },
  ],
};
