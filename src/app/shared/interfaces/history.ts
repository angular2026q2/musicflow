import { Track } from './track.interface';

export interface HistoryData {
  artist_name: string;
  album_name: string;
  album_image: string;
  audio: string;
  duration: number;
}

export interface HistoryRequest extends HistoryData {
  track_id: string;
  track_name: string;
}

export interface HistoryResponse extends HistoryRequest {
  id: string;
  user_id: string;
  played_at: string;
}

export interface HistoryGroup {
  date: string;
  label: string;
  tracks: Track[];
}
