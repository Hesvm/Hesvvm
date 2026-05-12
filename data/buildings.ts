export type BuildingStatus = 'Live' | 'Beta' | 'Archived';

export type Building = {
  name: string;
  tagline: string;
  icon: string;       // path to image in /public/images/buildings/
  status: BuildingStatus;
  url: string;        // external URL, opens in new tab
};

export const buildings: Building[] = [
  {
    name: 'Cent',
    tagline: 'Expense tracker app for lazy people',
    icon: '/images/buildings/cent.png',
    status: 'Live',
    url: 'https://cent-app.example.com',
  },
  {
    name: 'Weather Lab',
    tagline: 'Real-time weather visualization experiment',
    icon: '/images/buildings/cent.png',
    status: 'Beta',
    url: 'https://weather-lab.example.com',
  },
];
