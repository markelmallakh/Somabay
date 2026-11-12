import type { FaqItem } from "@/types/content";

/**
 * Drafted from facts published on somabay.com and the Figma wireframes (the wireframe FAQ
 * entries are placeholders). Review with Somabay before launch.
 */
export const faqs: FaqItem[] = [
  {
    id: "book-hotel",
    category: "staying",
    question: "How do I book a hotel?",
    answer:
      "Book directly on each hotel’s page on this site. You can also call the hotel reservation desk. The booking widget shows live availability.",
  },
  {
    id: "airport",
    category: "staying",
    question: "How far is Somabay from Hurghada International Airport?",
    answer:
      "Somabay is around 45 km south of Hurghada International Airport — roughly a 20-minute drive. Somabay Limousine offers private airport transfers.",
  },
  {
    id: "hotels",
    category: "staying",
    question: "Which hotels are in Somabay?",
    answer:
      "Kempinski Hotel Somabay, The Cascades Golf Resort, Spa & Thalasso, Robinson Club Somabay, Sheraton Somabay and The Breakers, plus serviced homes through Stayr.",
  },
  {
    id: "buy-home",
    category: "buying",
    question: "How can I buy a home in Somabay?",
    answer:
      "Explore the neighborhoods and available resale units on this site, then contact our sales team to arrange a call or a visit.",
  },
  {
    id: "schools",
    category: "buying",
    question: "Are there schools in Somabay?",
    answer:
      "Yes. GEMS International School Somabay and Kompass Somabay offer international education within the destination.",
  },
  {
    id: "medical",
    category: "buying",
    question: "Is there healthcare on site?",
    answer:
      "The Somabay Medical Center provides everyday healthcare for residents, guests and visitors, with a pharmacy on site.",
  },
  {
    id: "golf",
    category: "experience",
    question: "What golf is available?",
    answer:
      "Somabay is home to the 18-hole Gary Player championship course, a floodlit Par 3 course and a golf academy with a driving range and practice areas.",
  },
  {
    id: "getting-around",
    category: "experience",
    question: "How do I get around the peninsula?",
    answer:
      "Choose from G-Ride golf car rides with a driver, self-drive golf cars, an on-demand ride service, or Somabay Limousine for private journeys.",
  },
];

export const faqCategories = [
  { id: "all", label: "All questions" },
  { id: "staying", label: "Staying" },
  { id: "buying", label: "Buying a home" },
  { id: "experience", label: "Experience Somabay" },
] as const;
