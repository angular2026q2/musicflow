import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TrackResponse } from '@shared/interfaces/track-responce.interface';
import { Track } from '@shared/interfaces/track.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly baseUrl = '/api/v1';
  private http = inject(HttpClient);

  searchTracks(search: string, limit = 10, offset = 0) {
    const params = new HttpParams()
      .set('search', search)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<TrackResponse<Track>>(`${this.baseUrl}/music/tracks`, { params });
  }
}
