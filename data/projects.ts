export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  coverImage: string;
  icon: string;
  description: string;
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "hooshang-ai",
    title: "Hooshang AI",
    category: "AI Product",
    year: "2024",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["AI"],
  },
  {
    slug: "bundles",
    title: "Bundles",
    category: "Productivity",
    year: "2024",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Productivity"],
  },
  {
    slug: "expertmed",
    title: "ExpertMed",
    category: "Science Health",
    year: "2023",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Health"],
  },
  {
    slug: "dastyar",
    title: "Dastyar",
    category: "Assistant",
    year: "2023",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Assistant"],
  },
  {
    slug: "upolo",
    title: "Upolo",
    category: "Social",
    year: "2022",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Social"],
  },
  {
    slug: "cent",
    title: "Cent",
    category: "Finance",
    year: "2025",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Finance"],
  },
  {
    slug: "ap-doni",
    title: "اپ دونی",
    category: "App Store",
    year: "2025",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["App"],
  },
  {
    slug: "paradigm-space",
    title: "Paradigm Space",
    category: "Innovation",
    year: "2022",
    coverImage: "/images/placeholder.png",
    icon: "/images/placeholder.png",
    description: "Placeholder description",
    tags: ["Innovation"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
