import { Route } from '@shared/interfaces/route';

export const APP_ROUTES = {
  HOME: { label: 'Home', route: '' },
  SEARCH: { label: 'Search', route: 'search' },
  LIBRARY: { label: 'Library', route: 'library' },
  SETTINGS: { label: 'Settings', route: 'settings' },
  PROFILE: { label: 'Profile', route: 'profile' },
  DISCOVER: { label: 'Discover', route: 'discover' },
  ABOUT: { label: 'About Us', route: 'about' },
} as const satisfies Record<string, Route>;
