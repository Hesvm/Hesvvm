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
    id: 'days',
    name: 'Days',
    description: 'A simple journaling app for capturing daily memories with text, photo, stickers and video.',
    icon: '/images/icon-1.png',
    status: 'Live',
    appStoreUrl: 'https://apps.apple.com',
    siteUrl: 'https://days.example.com',
  },
  {
    id: 'then',
    name: 'Then',
    description: 'Understand how you spend your time and how it affects your mental state.',
    icon: '/images/icon-2.png',
    status: 'Live',
    appStoreUrl: 'https://apps.apple.com',
    siteUrl: 'https://then.example.com',
  },
  {
    id: 'rotate',
    name: 'Rotate',
    description: 'Custom rotating notes and checklists in your Home and Lock Screen Widgets.',
    icon: '/images/icon-3.png',
    status: 'Live',
    appStoreUrl: 'https://apps.apple.com',
  },
  {
    id: 'aim',
    name: 'Aim',
    description: 'Aim is a goal-tracking app that puts your aspirations front and center.',
    icon: '/images/icon-1.png',
    status: 'Live',
    appStoreUrl: 'https://apps.apple.com',
    siteUrl: 'https://aim.example.com',
  },
  {
    id: 'idle',
    name: 'Idle',
    description: 'Idle is a handmade, curated experience of finding inspiration in idleness.',
    icon: '/images/icon-2.png',
    status: 'Live',
    appStoreUrl: 'https://apps.apple.com',
  },
  {
    id: 'cent',
    name: 'Cent',
    description: 'Fast, minimal expense tracking for people who hate complicated financial apps.',
    icon: '/images/buildings/cent.png',
    status: 'Live',
    appStoreUrl: 'https://apps.apple.com',
    siteUrl: 'https://cent-app.example.com',
  },
  {
    id: 'new-thing',
    name: '...',
    description: "That new thing we're working on, but not ready to show yet.",
    icon: '',
    status: 'ComingSoon',
  },
];
