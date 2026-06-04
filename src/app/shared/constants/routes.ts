export const APP_ROUTES = {
  HOME: { label: 'Home', route: '' },
  SEARCH: { label: 'Search', route: 'search' },
  LIBRARY: { label: 'Library', route: 'library' },
  ABOUT: { label: 'About Us', route: 'about' },
  SETTINGS: { label: 'Settings', route: 'settings' },
  PROFILE: { label: 'Profile', route: 'profile' },
  DISCOVER: { label: 'Discover', route: 'discover' },
  ALBUMS: { label: 'Albums', route: 'albums' },
  ALBUM: { label: 'Album', route: 'album/:id' },
  ARTIST: { label: 'Artist', route: 'artist/:id' },
} as const;

export const buildAlbumPath = (id: string): string => `/album/${id}`;
export const buildArtistPath = (id: string): string => `/artist/${id}`;
