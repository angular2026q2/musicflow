import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { SearchTracksRequest } from '@core/services/dto/search-track.dto';
import type { CatalogResponse } from '@shared/interfaces/catalog.interface';
import type { TrackResponse } from '@shared/interfaces/track-responce.interface';
import type { Track } from '@shared/interfaces/track.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/v1';

  searchTracks(query: Signal<string>) {
    return httpResource<CatalogResponse<Track>>(() => {
      const q = query().trim();

      if (q.length < 2) return undefined;

      return {
        url: `${this.baseUrl}/music/tracks`,
        params: { search: q, limit: 10 },
      };
    });
  }

  fetchTracks(req: SearchTracksRequest) {
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
