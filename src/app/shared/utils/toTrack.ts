import { HistoryRequest } from '@shared/interfaces/history';
import { Track } from '@shared/interfaces/track.interface';

export function toTrack(t: HistoryRequest): Track {
  return {
    id: t.track_id,
    name: t.track_name,
    artist_name: t?.artist_name ?? '',
    album_name: t?.album_name ?? '',
    album_image: t.album_image ?? '',
    audio: t.audio,
    duration: t.duration,

    album_id: '',
    artist_idstr: '',
    artist_id: '',
    license_ccurl: '',
    position: 0,
    releasedate: '',
    audiodownload: '',
    prourl: '',
    shorturl: '',
    shareurl: '',
    image: '',
    audiodownload_allowed: false,
    content_id_free: false,
  };
}
