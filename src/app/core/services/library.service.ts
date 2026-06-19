import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HistoryRequest, HistoryResponse } from '@shared/interfaces/history';
import { PlaylistResponse } from '@shared/interfaces/playlist.interface';
import { Track } from '@shared/interfaces/track.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private readonly apiUrl = '/api/v1/';
  private readonly historyUrl = this.apiUrl + 'history';
  private readonly playlistsUrl = this.apiUrl + 'playlists';
  private readonly http = inject(HttpClient);

  readonly history = httpResource<HistoryResponse[]>(() => this.historyUrl);
  readonly playlists = httpResource<PlaylistResponse[]>(() => this.playlistsUrl);

  async addToHistory(track: Track) {
    const body: HistoryRequest = {
      track_id: track.id,
      track_name: track.name,
      artist_name: track.artist_name,
      album_name: track.album_name,
      album_image: track.album_image,
      audio: track.audio,
      duration: track.duration,
    };

    await firstValueFrom(this.http.post(this.historyUrl, body));
  }

  async createPlaylist(playlist: { name: string; description: string }): Promise<PlaylistResponse> {
    return await firstValueFrom(this.http.post<PlaylistResponse>(this.playlistsUrl, playlist));
  }

  async updatePlaylist() {
    //
  }

  async deletePlaylist(id: string) {
    await firstValueFrom(this.http.delete(this.playlistsUrl + '/' + id));
  }
}
