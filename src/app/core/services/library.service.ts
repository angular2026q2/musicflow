import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HistoryRequest, HistoryResponse } from '@shared/interfaces/history';
import { Track } from '@shared/interfaces/track.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private readonly apiUrl = '/api/v1/history';
  private readonly http = inject(HttpClient);

  readonly history = httpResource<HistoryResponse[]>(() => this.apiUrl);

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

    await firstValueFrom(this.http.post(this.apiUrl, body));
  }
}
