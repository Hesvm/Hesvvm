export type DividerBlock = {
  type: 'divider'
  variant: 1 | 2 | 3 | 4 | 5
}

export type TextBlock = {
  type: 'text'
  content: string
}

export type SingleImageBlock = {
  type: 'image'
  src: string
  subtitle?: string
}

export type DoubleImageBlock = {
  type: 'image-pair'
  left: { src: string; subtitle?: string }
  right: { src: string; subtitle?: string }
}

export type LinkBlock = {
  type: 'link'
  label: string
  href: string
}

export type ContentBlock = TextBlock | SingleImageBlock | DoubleImageBlock | DividerBlock | LinkBlock

export type Project = {
  slug: string
  title: string
  category: string
  year: string
  thumbnail: string
  icon: string
  tags: string[]
  link?: string
  blocks: ContentBlock[]
}

export const projects: Project[] = [
  {
    slug: "hooshang-ai",
    title: "Hooshang AI",
    category: "AI Product",
    year: "2024",
    thumbnail: "/images/li-post-3.png",
    icon: "/images/icon-1.png",
    tags: ["AI"],
    blocks: [
      {
        type: "text",
        content: "Empowering Persian creators with generative AI tools and visual storytelling."
      },
      {
        type: "image",
        src: "/images/li-post-3.png",
        subtitle: "Creative canvas interface"
      },
      {
        type: "image",
        src: "/images/x-post-1.png",
        subtitle: "Prompt engineer workspace"
      }
    ]
  },
  {
    slug: "bundles",
    title: "Bundles",
    category: "Productivity",
    year: "2024",
    thumbnail: "/images/li-post-4.png",
    icon: "/images/icon-2.png",
    tags: ["Productivity"],
    blocks: [
      {
        type: "text",
        content: "Curated resource bundles and workspace templates for high-velocity teams."
      },
      {
        type: "image",
        src: "/images/li-post-4.png",
        subtitle: "Bundle curation grid"
      },
      {
        type: "image",
        src: "/images/li-post-5.png",
        subtitle: "Team permissions & share sheet"
      }
    ]
  },
  {
    slug: "expertmed",
    title: "ExpertMed",
    category: "Science Health",
    year: "2023",
    thumbnail: "/images/li-post-5.png",
    icon: "/images/icon-3.png",
    tags: ["Health"],
    blocks: [
      {
        type: "text",
        content: "Doctors were drowning in admin work. ExpertMed removes that friction entirely — letting clinicians focus on patients, not paperwork. I designed the end-to-end experience from research through to a shipped iOS product."
      },
      {
        type: "image",
        src: "/images/li-post-5.png",
        subtitle: "The main dashboard — designed for one-handed use during rounds."
      },
      {
        type: "divider",
        variant: 1
      },
      {
        type: "text",
        content: "The core challenge was information density. Medical professionals need a lot of data at a glance, but cognitive overload is a real risk in clinical settings. The solution was a layered hierarchy — summary first, detail on demand."
      },
      {
        type: "image-pair",
        left: {
          src: "/images/x-post-1.png",
          subtitle: "Patient summary card"
        },
        right: {
          src: "/images/li-post-3.png",
          subtitle: "Prescription flow"
        }
      },
      {
        type: "divider",
        variant: 3
      },
      {
        type: "text",
        content: "After launch, task completion time dropped by 40%. Nurses reported spending 15 fewer minutes per shift on documentation. That's the number that matters."
      },
      {
        type: "image",
        src: "/images/li-post-4.png",
        subtitle: "Clinical outcomes & analytics"
      },
      {
        type: "link",
        label: "View on App Store",
        href: "https://apple.com"
      }
    ]
  },
  {
    slug: "dastyar",
    title: "Dastyar",
    category: "Assistant",
    year: "2023",
    thumbnail: "/images/x-post-1.png",
    icon: "/images/icon-1.png",
    tags: ["Assistant"],
    blocks: [
      {
        type: "text",
        content: "Personal Persian AI assistant designed for seamless workflow automation."
      },
      {
        type: "image",
        src: "/images/x-post-1.png",
        subtitle: "Assistant conversational hub"
      },
      {
        type: "image",
        src: "/images/li-post-3.png",
        subtitle: "Quick action widget"
      }
    ]
  },
  {
    slug: "upolo",
    title: "Upolo",
    category: "Social",
    year: "2022",
    thumbnail: "/images/li-post-3.png",
    icon: "/images/icon-2.png",
    tags: ["Social"],
    blocks: [
      {
        type: "text",
        content: "Audio-first micro communities and real-time voice stages."
      },
      {
        type: "image",
        src: "/images/li-post-3.png",
        subtitle: "Live audio stage interface"
      },
      {
        type: "image",
        src: "/images/li-post-4.png",
        subtitle: "Community channel discovery"
      }
    ]
  },
  {
    slug: "cent",
    title: "Cent",
    category: "Finance",
    year: "2025",
    thumbnail: "/images/buildings/cent.png",
    icon: "/images/buildings/cent.png",
    tags: ["Finance"],
    blocks: [
      {
        type: "text",
        content: "Fast, minimal expense tracking for people who hate complicated financial apps."
      },
      {
        type: "image",
        src: "/images/buildings/cent.png",
        subtitle: "Cent visual brandmark"
      },
      {
        type: "image",
        src: "/images/li-post-5.png",
        subtitle: "Transaction input & haptic feedback"
      }
    ]
  },
  {
    slug: "ap-doni",
    title: "اپ دونی",
    category: "App Store",
    year: "2025",
    thumbnail: "/images/li-post-4.png",
    icon: "/images/icon-1.png",
    tags: ["App"],
    blocks: [
      {
        type: "text",
        content: "Curated Persian app discovery and alternative app store."
      },
      {
        type: "image",
        src: "/images/li-post-4.png",
        subtitle: "Curated app feed"
      },
      {
        type: "image",
        src: "/images/x-post-1.png",
        subtitle: "App detail view & developer spotlight"
      }
    ]
  },
  {
    slug: "paradigm-space",
    title: "Paradigm Space",
    category: "Innovation",
    year: "2022",
    thumbnail: "/images/li-post-5.png",
    icon: "/images/icon-2.png",
    tags: ["Innovation"],
    blocks: [
      {
        type: "text",
        content: "Physical-digital hybrid incubator for creative tech founders."
      },
      {
        type: "image",
        src: "/images/li-post-5.png",
        subtitle: "Space booking & event coordination"
      },
      {
        type: "image",
        src: "/images/li-post-3.png",
        subtitle: "Resident directory & projects"
      }
    ]
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
