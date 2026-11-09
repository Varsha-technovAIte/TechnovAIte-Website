// Central content and navigation config. Only verified content lives here;
// anything not yet confirmed by TechnovAIte is marked as coming soon.

export const site = {
  name: "TechnovAIte",
  url: "https://technovaite.com",
  tagline: "Technology capabilities. Connected for outcomes.",
  description:
    "TechnovAIte helps organisations identify, access, structure, and coordinate technology capabilities through curated specialist partners and flexible delivery models.",
  contact: {
    email: "adarsh.a@technovaite.com",
    phone: "+61 434 689 415",
    phoneDisplay: "(+61) 0434 689 415",
  },
  // TODO: confirm the official LinkedIn company URL before launch.
  linkedin: "https://www.linkedin.com/company/technovaite",
};

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; mega?: boolean; items: NavItem[] };

export const capabilities = [
  {
    slug: "ai-digital-delivery-pods",
    name: "AI & Digital Delivery Pods",
    short: "Delivery Pods",
    headline: "Specialist teams. Focused execution.",
    summary:
      "Access partner-led AI and digital delivery teams structured around defined technology initiatives.",
    detail:
      "Potential areas include AI engineering, application development, data platforms, automation, and digital product delivery, subject to partner availability.",
    cta: "Explore Delivery Pods",
    nav: "Cross-functional teams aligned to specific digital outcomes.",
    areas: ["AI engineering", "Application development", "Data platforms", "Automation", "Digital product delivery"],
    fit: [
      "You have a defined initiative and need delivery capacity quickly",
      "You want a cross-functional team rather than individual hires",
      "You need structure and governance around partner-led execution",
    ],
  },
  {
    slug: "nano-gcc-bot",
    name: "Nano-GCC & BOT",
    short: "Nano-GCC",
    headline: "Build capability that scales with you.",
    summary:
      "Explore flexible offshore capability structures and Build-Operate-Transfer models aligned to your growth plans.",
    detail:
      "Right-sized offshore capability models designed for scalable delivery — structured through the partner ecosystem with governance built in.",
    cta: "Explore Nano-GCC",
    nav: "Right-sized offshore capability models for scalable delivery.",
    areas: ["Offshore capability centres", "Build-Operate-Transfer", "Scalable team structures", "Governance & transition planning"],
    fit: [
      "You want offshore delivery without structural complexity",
      "You are planning a path to owning capability over time",
      "You need an operating model that grows with your roadmap",
    ],
  },
  {
    slug: "partner-led-specialist-services",
    name: "Partner-Led Specialist Services",
    short: "Specialist Services",
    headline: "The expertise you need. When you need it.",
    summary:
      "Connect with curated specialist partners across technology domains and delivery requirements.",
    detail:
      "Curated specialist partners across cloud, cyber, AI, and transformation domains — aligned to your programme rather than added to your vendor list.",
    cta: "Explore Specialist Services",
    nav: "Curated specialists across cloud, cyber, AI, and transformation.",
    areas: ["Cloud", "Cyber security", "AI", "Transformation programmes"],
    fit: [
      "You need niche expertise for a transformation programme",
      "You want fewer, better-aligned specialist relationships",
      "You need clarity on partner roles and accountability",
    ],
  },
  {
    slug: "platform-enabled-advisory",
    name: "Platform-Enabled Advisory",
    short: "Advisory",
    headline: "Better decisions. Clearer direction.",
    summary:
      "Explore structured capability advisory designed to support informed technology decisions and delivery planning.",
    detail:
      "Structured advisory supported by evolving platform intelligence, helping leaders frame the problem before committing to a delivery model.",
    cta: "Explore Advisory",
    nav: "Structured advisory supported by evolving platform intelligence.",
    areas: ["Capability assessment", "Delivery model selection", "Partner configuration", "Governance design"],
    fit: [
      "You are unsure which capability model fits your initiative",
      "You want an independent view before engaging delivery partners",
      "You need a structured plan to take to your board or leadership",
    ],
  },
] as const;

export type Capability = (typeof capabilities)[number];

export const nav: NavGroup[] = [
  {
    label: "Company",
    href: "/company/about",
    mega: true,
    items: [
      { label: "About TechnovAIte", href: "/company/about", description: "Our mission and orchestration model" },
      { label: "Our Approach", href: "/company/approach", description: "A more connected way to deliver outcomes" },
      { label: "How We Work", href: "/company/how-we-work", description: "From business need to capability model" },
      { label: "Partner Ecosystem", href: "/company/partners", description: "Curated specialists, aligned to your goals" },
      { label: "Leadership", href: "/company/leadership", description: "The people behind TechnovAIte" },
      { label: "Contact", href: "/contact", description: "Start a conversation with our team" },
    ],
  },
  {
    label: "Capabilities",
    href: "/capabilities",
    mega: true,
    items: [
      { label: "Capabilities Overview", href: "/capabilities", description: "Four models. One orchestrated approach." },
      ...capabilities.map((c) => ({ label: c.name, href: `/capabilities/${c.slug}`, description: c.nav })),
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "Insights", href: "/resources/insights" },
      { label: "Articles", href: "/resources/articles" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Technology Perspectives", href: "/resources/perspectives" },
      { label: "Guides & Resources", href: "/resources/guides" },
    ],
  },
  {
    label: "Solvrr™",
    href: "/solvrr",
    items: [
      { label: "Introducing Solvrr™", href: "/solvrr" },
      { label: "Platform Vision", href: "/solvrr#vision" },
      { label: "How Solvrr™ Works", href: "/solvrr#how-it-works" },
      { label: "Join the Waitlist", href: "/solvrr#waitlist" },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
    items: [
      { label: "Life at TechnovAIte", href: "/careers#life" },
      { label: "Careers Overview", href: "/careers" },
      { label: "Open Opportunities", href: "/careers#opportunities" },
      { label: "Partner Opportunities", href: "/careers#partner-opportunities" },
    ],
  },
];

export const resourceSections = [
  { slug: "insights", label: "Insights", blurb: "Short, practical thinking on technology capability and delivery." },
  { slug: "articles", label: "Articles", blurb: "Long-form perspectives for technology and business leaders." },
  { slug: "case-studies", label: "Case Studies", blurb: "Verified engagement stories, published with client approval." },
  { slug: "perspectives", label: "Technology Perspectives", blurb: "Points of view on emerging technology and delivery models." },
  { slug: "guides", label: "Guides & Resources", blurb: "Frameworks and checklists for planning technology initiatives." },
] as const;

export const resourceCategories = [
  "AI & Emerging Technology",
  "Digital Delivery",
  "Technology Strategy",
  "Offshore Capability Models",
  "Engineering & Platforms",
  "Leadership Perspectives",
];

// Business needs used by the Capability Orchestration Experience and the contact form.
export type CapabilityKey = "pods" | "gcc" | "specialist" | "governance";

export const orchestrationNodes: { key: CapabilityKey; label: string; href: string }[] = [
  { key: "pods", label: "AI & Digital Delivery Pods", href: "/capabilities/ai-digital-delivery-pods" },
  { key: "gcc", label: "Nano-GCC & BOT", href: "/capabilities/nano-gcc-bot" },
  { key: "specialist", label: "Partner-Led Specialist Services", href: "/capabilities/partner-led-specialist-services" },
  { key: "governance", label: "Governance & Advisory", href: "/capabilities/platform-enabled-advisory" },
];

export const businessNeeds: {
  slug: string;
  label: string;
  capabilities: CapabilityKey[];
  explanation: string;
  outcome: string;
  cta: string;
}[] = [
  {
    slug: "ai-initiative",
    label: "Launch an AI initiative",
    capabilities: ["pods", "specialist", "governance"],
    explanation:
      "Bring together suitable AI expertise, delivery capacity, and coordination to move an AI initiative from concept toward execution.",
    outcome: "A clearer delivery structure with access to relevant specialist capabilities.",
    cta: "Discuss Your AI Initiative",
  },
  {
    slug: "scale-engineering",
    label: "Scale engineering capacity",
    capabilities: ["pods", "gcc", "governance"],
    explanation:
      "Explore flexible delivery teams and scalable operating models aligned to your technology roadmap.",
    outcome: "Greater delivery flexibility without having to build every capability internally.",
    cta: "Explore Delivery Models",
  },
  {
    slug: "offshore-capability",
    label: "Build offshore capability",
    capabilities: ["gcc", "governance"],
    explanation:
      "Structure a right-sized offshore capability through Nano-GCC or Build-Operate-Transfer models delivered via the partner ecosystem.",
    outcome: "Structured offshore capability with governance from the outset.",
    cta: "Explore Nano-GCC",
  },
  {
    slug: "specialist-expertise",
    label: "Access specialist expertise",
    capabilities: ["specialist", "governance"],
    explanation:
      "Identify suitable specialist partners and align their expertise with your business requirements.",
    outcome: "A more structured path to engaging the right expertise.",
    cta: "Find the Right Capability",
  },
  {
    slug: "digital-transformation",
    label: "Accelerate digital transformation",
    capabilities: ["pods", "specialist", "governance"],
    explanation:
      "Combine delivery capacity and specialist transformation expertise under one coordinated structure, so programmes move without adding vendor fragmentation.",
    outcome: "Coordinated progress across the capabilities your transformation depends on.",
    cta: "Discuss Your Transformation",
  },
];

export const processSteps = [
  {
    title: "Understand",
    copy: "We begin with your business challenge, objectives, and delivery requirements.",
    detail: ["Business challenge", "Objectives", "Delivery requirements"],
  },
  {
    title: "Structure",
    copy: "We explore suitable capability models, delivery options, and partner configurations.",
    detail: ["Capability models", "Delivery options", "Partner configurations"],
  },
  {
    title: "Connect",
    copy: "We help align relevant specialist partners, roles, and engagement structures.",
    detail: ["Specialist partners", "Roles", "Engagement structures"],
  },
  {
    title: "Coordinate",
    copy: "We support the agreed coordination and governance approach as the engagement progresses.",
    detail: ["Coordination", "Governance", "Progress visibility"],
  },
];
