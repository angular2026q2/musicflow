import { Track } from './track.interface';

export type RecentTrack = Pick<
  Track,
  'id' | 'album_image' | 'artist_name' | 'duration' | 'audio' | 'album_name'
> & {
  user_id: string;
  played_at: string;
  track_id: string;
  track_name: string;
};
