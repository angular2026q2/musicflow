import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TrackResponse } from '@shared/interfaces/track-responce.interface';
import { Track } from '@shared/interfaces/track.interface';
import { SearchTracksRequest } from '@core/services/dto/search-track-request';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly baseUrl = '/api/v1';
  private readonly http = inject(HttpClient);

  searchTracks(req: SearchTracksRequest) {
    let params = new HttpParams()
      .set('search', req.search)
      .set('limit', req.limit.toString())
      .set('offset', req.offset.toString());

    if (req.tags?.length) {
      params = params.set('tags', req.tags.join(','));
    }

    return this.http.get<TrackResponse<Track>>(`${this.baseUrl}/music/tracks`, { params });
  }
}
