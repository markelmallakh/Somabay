import { image } from "@/lib/media";

export type Job = {
  slug: string;
  title: string;
  summary: string;
  /** The team the role sits in, shown with the location. */
  department: string;
  location: string;
  type: string;
  /** About the role, as bullet points. */
  about: string[];
  requirements: string[];
  /** Benefits & privileges, as bullet points. */
  benefits: string[];
};

export const careersHero = {
  eyebrow: "Careers",
  title: "Join Somabay",
  image: image(
    "/images/careers/career-hero.webp",
    "A Somabay receptionist handing a guest her room key at the front desk",
    { position: "50% 30%" },
  ),
};

/** DRAFT COPY: "Why work at Somabay", written for the layout; confirm with Somabay HR. */
export const whySomabay = {
  eyebrow: "Why Somabay",
  title: "Why Work at Somabay",
  description:
    "Work where others come to unwind. At Somabay, you help shape a growing Red Sea destination alongside a close-knit team that values ideas, care and craft.",
  points: [
    {
      title: "Life by the Red Sea",
      text: "A workplace surrounded by beaches, golf and open landscapes.",
    },
    { title: "Room to Grow", text: "Training, mentoring and clear paths to take on more." },
    { title: "Meaningful Work", text: "Every role shapes how people visit, live and belong here." },
    {
      title: "A Close-Knit Team",
      text: "Collaborative, supportive colleagues across every department.",
    },
  ],
  image: image("/images/library/kaktus/muo-1602.webp", "The Kaktus co-working lounge"),
};

/** The benefits Somabay lists for its roles (from the Real Estate Sales Consultant posting). */
const benefits = [
  "Competitive salary & performance incentives",
  "Professional growth & career development",
  "Learning & training opportunities",
  "Collaborative & creative work environment",
  "Exposure to premium real estate projects",
  "Medical insurance coverage",
  "Employee recognition programs",
  "Flexible & supportive team culture",
];

/** Applications are emailed to HR. DRAFT: the HR address is to be confirmed by Somabay. */
export const applicationEmail = "hr@somabay.com";

export const jobs: Job[] = [
  {
    slug: "senior-architectural-designer",
    title: "Senior Architectural Designer",
    summary:
      "Lead the development of innovative architectural concepts and collaborate closely with multidisciplinary teams to shape premium residential and mixed-use destinations.",
    department: "Design & Development",
    location: "El Sheikh Zayed, Giza",
    type: "Full-time",
    // DRAFT COPY: written for the layout until HR supplies the full posting.
    about: [
      "Lead architectural concepts for premium residential and mixed-use projects",
      "Develop designs from early massing through detailed drawings",
      "Work closely with engineering, landscape and interiors teams",
      "Present design options to stakeholders and refine them with feedback",
      "Keep designs aligned with Somabay’s masterplan and design guidelines",
    ],
    requirements: [
      "Bachelor’s degree in Architecture",
      "7+ years of experience in residential or hospitality design",
      "Strong command of AutoCAD, Revit and 3D visualisation tools",
      "A strong portfolio of built or detailed projects",
      "Excellent communication and presentation skills",
    ],
    benefits,
  },
  {
    slug: "marketing-and-brand-executive",
    title: "Marketing & Brand Executive",
    summary:
      "Support the growth of the Somabay brand through creative campaigns, digital storytelling, and integrated marketing initiatives.",
    department: "Marketing",
    location: "Somabay, Hurghada",
    type: "Full-time",
    // DRAFT COPY: written for the layout until HR supplies the full posting.
    about: [
      "Plan and run integrated campaigns across digital and offline channels",
      "Create content and stories that bring the Somabay brand to life",
      "Coordinate with agencies, photographers and partners",
      "Track campaign results and report on what works",
      "Keep every touchpoint consistent with the brand guidelines",
    ],
    requirements: [
      "Bachelor’s degree in Marketing, Communications or a related field",
      "3+ years of experience in marketing or brand roles",
      "Strong writing skills in English; Arabic is a plus",
      "Experience with social media and digital advertising tools",
      "A creative eye and attention to detail",
    ],
    benefits,
  },
  {
    slug: "community-experience-specialist",
    title: "Community Experience Specialist",
    summary:
      "Help create seamless and meaningful customer journeys by enhancing communication, engagement, and resident experiences.",
    department: "Community Relations",
    location: "Somabay, Hurghada",
    type: "Full-time",
    // DRAFT COPY: written for the layout until HR supplies the full posting.
    about: [
      "Be the first point of contact for residents and visitors",
      "Plan community events and engagement activities",
      "Gather feedback and turn it into better experiences",
      "Coordinate with operations teams to resolve requests quickly",
      "Keep residents informed through clear, friendly communication",
    ],
    requirements: [
      "Bachelor’s degree in Hospitality, Business or a related field",
      "2+ years of experience in customer experience or hospitality",
      "Excellent communication skills in English and Arabic",
      "A warm, solution-focused approach",
      "Comfortable working on-site in Somabay",
    ],
    benefits,
  },
  {
    slug: "real-estate-sales-consultant",
    title: "Real Estate Sales Consultant",
    summary:
      "Guide clients through their investment and lifestyle journey while representing Somabay values and premium developments.",
    department: "Real Estate Sales",
    location: "El Sheikh Zayed, Giza",
    type: "Full-time",
    about: [
      "Engage with potential clients and understand their needs",
      "Present suitable homes and investment opportunities",
      "Guide clients through every step of the sales process",
      "Represent Somabay’s values with professionalism, transparency and care",
      "Build long-term relationships with clients",
    ],
    requirements: [
      "Bachelor’s degree in Business, Marketing, or related field",
      "Previous experience in real estate sales is preferred",
      "Strong communication and negotiation skills",
      "Presentable, confident, and customer-oriented personality",
      "Strong understanding of the Egyptian real estate market is a plus",
      "Excellent organizational and follow-up skills",
    ],
    benefits,
  },
];

export const getJob = (slug: string) => jobs.find((job) => job.slug === slug);

export const applyHref = (job: Job) =>
  `mailto:${applicationEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}&body=${encodeURIComponent("Please find my CV attached.\n\n")}`;
