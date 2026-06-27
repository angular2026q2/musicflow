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
  ARTISTS: { label: 'Artists', route: 'artists' },
  ARTIST: { label: 'Artist', route: 'artist/:id' },
  PLAYLIST: { label: 'Playlist', route: 'playlist/:id' },
  TRACK: { label: 'Track', route: 'track/:id' },
  RESET_PASSWORD: { label: 'Reset Password', route: 'reset-password' },
} as const;

export const buildAlbumPath = (id: string): string => `/album/${id}`;
export const buildArtistPath = (id: string): string => `/artist/${id}`;
export const buildTrackPath = (id: string): string => `/track/${id}`;
