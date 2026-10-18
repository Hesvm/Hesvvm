export type BuildingStatus = 'Live' | 'Beta' | 'ComingSoon' | 'Archived';

export type Building = {
  id?: string;
  name: string;
  tagline?: string;
  description?: string;
  icon: string;
  status: BuildingStatus;
  url?: string;
  appStoreUrl?: string;
  siteUrl?: string;
};

export const buildings: Building[] = [
  {
    id: 'vibekit',
    name: 'Vibekit',
    description: 'Curated components, shaders, and animations for vibe-coding.',
    icon: '/images/buildings/v4/vibekit-v4.png',
    status: 'Live',
    siteUrl: 'https://vibekit.store',
  },
  {
    id: 'heslab',
    name: 'HesLab',
    description: 'Short-form video editing studio focused on creator retention.',
    icon: '/images/buildings/v4/heslab-v4.png',
    status: 'Live',
    siteUrl: 'https://hes-lab.vercel.app',
  },
  {
    id: 'birthday',
    name: 'Birthday',
    description: 'Interactive time capsule exploring memories of your birth day.',
    icon: '/images/buildings/v4/birthday-v4.png',
    status: 'Live',
    siteUrl: 'https://birthday-dun.vercel.app',
  },
  {
    id: 'ravioli',
    name: 'Ravioli',
    description: 'Turn any image into a vintage perforated postage stamp.',
    icon: '/images/buildings/v4/ravioli-v4.png',
    status: 'Live',
    siteUrl: 'https://raviolitool.vercel.app',
  },
  {
    id: 'cent',
    name: 'Cent',
    description: 'Fast, minimal expense tracking without complicated spreadsheets.',
    icon: '/images/buildings/v4/cent-v4.png',
    status: 'Live',
    siteUrl: 'https://cent-bice.vercel.app',
  },
  {
    id: 'trace-my-money',
    name: 'Trace My Money',
    description: 'A visual workspace to track income, expenses, and savings.',
    icon: '/images/buildings/v4/trace-my-money-v4.png',
    status: 'Live',
    siteUrl: 'https://trace-my-money.vercel.app',
  },
];
