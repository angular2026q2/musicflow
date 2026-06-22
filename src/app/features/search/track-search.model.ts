export const TRACK_SORT_OPTIONS = [
  { label: 'Artist A → Z', value: 'artist_asc', mode: 'local' },
  { label: 'Artist Z → A', value: 'artist_desc', mode: 'local' },
  { label: 'Track A → Z', value: 'track_asc', mode: 'local' },
  { label: 'Track Z → A', value: 'track_desc', mode: 'local' },
  { label: 'Newest first', value: 'date_desc', mode: 'local' },
  { label: 'Oldest first', value: 'date_asc', mode: 'local' },
  { label: 'Popularity ↑', value: 'popularity_asc', mode: 'server' },
  { label: 'Popularity ↓', value: 'popularity_desc', mode: 'server' },
] as const;

export type TrackSort = (typeof TRACK_SORT_OPTIONS)[number]['value'];
