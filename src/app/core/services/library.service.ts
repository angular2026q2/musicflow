import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HistoryRequest, HistoryResponse } from '@shared/interfaces/history';
import { Payload } from '@shared/interfaces/payload';
import { PlaylistResponse } from '@shared/interfaces/playlist.interface';
import { Track } from '@shared/interfaces/track.interface';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private readonly apiUrl = '/api/v1/';
  private readonly historyUrl = this.apiUrl + 'history';
  private readonly playlistsUrl = this.apiUrl + 'playlists';
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  readonly history = httpResource<HistoryResponse[]>(() =>
    this.auth.isAuthenticated() ? this.historyUrl : undefined,
  );
  readonly playlists = httpResource<PlaylistResponse[]>(() =>
    this.auth.isAuthenticated() ? this.playlistsUrl : undefined,
  );

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

  async updatePlaylist(id: string, payload: Payload): Promise<PlaylistResponse> {
    return firstValueFrom(this.http.put<PlaylistResponse>(`${this.playlistsUrl}/${id}`, payload));
  }

  async createPlaylistWithTracks(payload: Payload): Promise<PlaylistResponse> {
    const created = await this.createPlaylist({
      name: payload.name,
      description: payload.description,
    });
    return this.updatePlaylist(created.id, {
      name: created.name,
      description: created.description ?? '',
      tracks: payload.tracks,
    });
  }

  async deletePlaylist(id: string) {
    await firstValueFrom(this.http.delete(this.playlistsUrl + '/' + id));
  }
}
