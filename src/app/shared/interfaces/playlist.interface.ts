import { HistoryRequest } from './history';

export interface Playlist {
  name: string;
  description: string;
  tracks: HistoryRequest[];
}

export interface PlaylistResponse extends Playlist {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
