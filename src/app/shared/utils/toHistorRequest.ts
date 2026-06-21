import { HistoryRequest } from '@shared/interfaces/history';
import { Track } from '@shared/interfaces/track.interface';

export function toHistoryRequest(t: Track | HistoryRequest): HistoryRequest {
  // из Track
  if ('id' in t && 'name' in t) {
    return {
      track_id: t.id,
      track_name: t.name,
      artist_name: t.artist_name,
      album_name: t.album_name,
      album_image: t.album_image,
      audio: t.audio,
      duration: t.duration,
    };
  }

  return {
    track_id: t.track_id,
    track_name: t.track_name,
    artist_name: t.artist_name,
    album_name: t.album_name,
    album_image: t.album_image,
    audio: t.audio,
    duration: t.duration,
  };
}
