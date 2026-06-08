/**
 * @description Represents a single track within an album response.
 * @note: position and duration come as strings from Jamendo /albums/tracks endpoint.
 */
export interface AlbumTrack {
  id: string;
  position: string;
  name: string;
  duration: string;
  license_ccurl: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
}
