import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Track } from '@shared/interfaces/track.interface';
import { SearchTracksRequest } from '@core/services/dto/search-track.dto';
import { CatalogResponse } from '@shared/interfaces/catalog.interface';

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

    return this.http.get<CatalogResponse<Track>>(`${this.baseUrl}/music/tracks`, { params });
  }
}
