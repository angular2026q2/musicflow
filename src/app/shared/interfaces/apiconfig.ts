export interface ApiConfig {
  baseUrl: string;
  path: {
    history: string;
    playlists: string;
    albums: string;
    artists: string;
    playCounts: string;
  };
}
