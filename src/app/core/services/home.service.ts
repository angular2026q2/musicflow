import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CatalogResponse } from '@shared/interfaces/catalog.interface';
import { RecentTrack } from '@shared/interfaces/recent-track.interface';
import { Track } from '@shared/interfaces/track.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl = '/api/v1';
  private http = inject(HttpClient);

  getTracksUrl() {
    return `${this.baseUrl}/music/tracks`;
  }

  getHistoryUrl() {
    return `${this.baseUrl}/history`;
  }

  getTrendingTracks() {
    return this.http.get<CatalogResponse<Track>>(`${this.baseUrl}/music/tracks`, {
      params: {
        search: '?order=popularity_total',
        limit: '15',
        offset: '0',
      },
    });
  }

  getNewReleases() {
    return this.http.get<CatalogResponse<Track>>(`${this.baseUrl}/music/tracks`, {
      params: {
        search: `?order=releasedate_desc`,
        limit: '10',
        offset: '0',
      },
    });
  }

  getRecentlyPlayed() {
    return this.http.get<RecentTrack[]>(`${this.baseUrl}/history`);
  }
}
