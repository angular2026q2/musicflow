import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { CatalogResponse } from '@shared/interfaces/catalog.interface';
import { Track } from '@shared/interfaces/track.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchTracks(query: Signal<string>) {
    return httpResource<CatalogResponse<Track>>(() => {
      const q = query().trim();

      if (q.length < 2) return undefined;

      return {
        url: '/api/v1/music/tracks',
        params: {
          search: q,
          limit: 10,
        },
      };
    });
  }
}
