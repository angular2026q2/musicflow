import { Payload } from './payload';

export interface Playlist extends Payload {
  duration?: number;
}

export interface PlaylistResponse extends Playlist {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
