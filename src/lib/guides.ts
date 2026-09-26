import { getBlogPostBySlug, getAllBlogPosts, type BlogPost } from "./blog";

export type GuideSection = {
  id: string;
  title: string;
  blurb: string;
  slugs: string[];
};

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "getting-started",
    title: "Getting Started with Mobile Grooming",
    blurb: "New to mobile grooming? Start here to learn how it works and how it compares to a salon.",
    slugs: [
      "what-happens-during-mobile-dog-grooming-appointment-walkthrough",
      "how-to-prepare-for-first-mobile-grooming-appointment",
      "mobile-dog-grooming-vs-salon-which-is-right",
      "puppys-first-grooming-appointment-when-to-start",
    ],
  },
  {
    id: "costs-and-choosing",
    title: "Costs and Choosing a Groomer",
    blurb: "What mobile grooming costs, how to vet a groomer, and the etiquette around booking.",
    slugs: [
      "mobile-dog-grooming-cost-guide-raleigh-durham-triangle",
      "how-to-choose-a-trustworthy-mobile-dog-groomer-checklist",
      "how-much-to-tip-a-mobile-dog-groomer",
      "multi-pet-household-mobile-grooming-scheduling-guide",
    ],
  },
  {
    id: "coat-and-breed",
    title: "Coat and Breed Care",
    blurb: "How coat type changes grooming frequency, shedding, and matting risk.",
    slugs: [
      "how-often-should-you-groom-your-dog-breed-guide",
      "grooming-double-coated-dogs-nc-humidity-shedding-season",
      "doodle-poodle-mix-grooming-guide-different-coat-routine",
      "matted-dog-fur-when-shaving-is-necessary",
      "how-to-brush-your-dog-between-grooming-appointments",
      "how-often-should-you-bathe-your-dog",
    ],
  },
  {
    id: "health-and-hygiene",
    title: "Health and Hygiene",
    blurb: "Nails, ears, and teeth: the parts of grooming that affect your dog's health.",
    slugs: [
      "dog-nail-trims-why-they-matter-nick-the-quick",
      "dog-ear-cleaning-humidity-infection-prevention",
      "dog-dental-health-teeth-brushing-grooming-routine",
    ],
  },
  {
    id: "special-situations",
    title: "Seasons and Special Situations",
    blurb: "Fall care, senior and anxious dogs, and grooming cats.",
    slugs: [
      "fall-dog-grooming-guide-north-carolina-flea-tick-season",
      "mobile-grooming-for-senior-and-anxious-dogs-nc",
      "mobile-cat-grooming-does-your-cat-need-it",
    ],
  },
];

const SERVICE_GUIDE: Record<string, string> = {
  "Cat Grooming": "mobile-cat-grooming-does-your-cat-need-it",
  "Nail Trim": "dog-nail-trims-why-they-matter-nick-the-quick",
  "Nail Grinding": "dog-nail-trims-why-they-matter-nick-the-quick",
  "Ear Cleaning": "dog-ear-cleaning-humidity-infection-prevention",
  "Teeth Brushing": "dog-dental-health-teeth-brushing-grooming-routine",
  "De-Matting": "matted-dog-fur-when-shaving-is-necessary",
  "De-Shedding Treatment": "grooming-double-coated-dogs-nc-humidity-shedding-season",
  "Flea & Tick Treatment": "fall-dog-grooming-guide-north-carolina-flea-tick-season",
  "Full Groom": "how-often-should-you-groom-your-dog-breed-guide",
  "Bath & Brush": "how-often-should-you-groom-your-dog-breed-guide",
};

const DEFAULT_GUIDES = [
  "mobile-dog-grooming-cost-guide-raleigh-durham-triangle",
  "how-to-choose-a-trustworthy-mobile-dog-groomer-checklist",
  "what-happens-during-mobile-dog-grooming-appointment-walkthrough",
];

function resolve(slugs: string[], limit: number): BlogPost[] {
  const out: BlogPost[] = [];
  for (const slug of slugs) {
    const post = getBlogPostBySlug(slug);
    if (post && !out.some((p) => p.slug === post.slug)) out.push(post);
    if (out.length >= limit) break;
  }
  return out;
}

export function getGuideForService(service: string): BlogPost | null {
  const slug = SERVICE_GUIDE[service];
  return slug ? (getBlogPostBySlug(slug) ?? null) : null;
}

export function getGuidesForServices(services: string[], limit = 3): BlogPost[] {
  const specific = services.map((s) => SERVICE_GUIDE[s]).filter((s): s is string => Boolean(s));
  const nonGeneric = specific.filter((s) => s !== SERVICE_GUIDE["Full Groom"]);
  return resolve([...nonGeneric, ...DEFAULT_GUIDES, ...specific], limit);
}

export function getDefaultGuides(limit = 3): BlogPost[] {
  return resolve(DEFAULT_GUIDES, limit);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const section = GUIDE_SECTIONS.find((s) => s.slugs.includes(slug));
  const sameSection = section ? section.slugs.filter((s) => s !== slug) : [];
  const newest = getAllBlogPosts()
    .map((p) => p.slug)
    .filter((s) => s !== slug);
  return resolve([...sameSection, ...newest], limit);
}
