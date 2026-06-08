import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import type { RecentlyPlayedTrack } from '@shared/interfaces/recently-played-track.interface';
import type { TrackResponse } from '@shared/interfaces/track-response.interface';
import type { Track } from '@shared/interfaces/track.interface';
import { Genre } from '@shared/types/genre.type';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl = '/api/v1';
  private readonly http = inject(HttpClient);

  getTrendingTracks(): Promise<TrackResponse<Track>> {
    return firstValueFrom(
      this.http.get<TrackResponse<Track>>(`${this.baseUrl}/music/tracks`, {
        params: { search: '?order=popularity_total', limit: '15', offset: '0' },
      }),
    );
  }

  getNewReleases(): Promise<TrackResponse<Track>> {
    return firstValueFrom(
      this.http.get<TrackResponse<Track>>(`${this.baseUrl}/music/tracks`, {
        params: { search: '?order=releasedate_desc', limit: '10', offset: '0' },
      }),
    );
  }

  getGenres(): Promise<Genre[]> {
    return Promise.resolve([
      Genre.Electronic,
      Genre.Rock,
      Genre.Classical,
      Genre.AmbientNewAge,
      Genre.Filmscore,
      Genre.Advertising,
      Genre.Pop,
      Genre.Corporate,
      Genre.Alternative,
    ]);
  }

  getRecentlyPlayed(): Promise<RecentlyPlayedTrack[]> {
    return firstValueFrom(this.http.get<RecentlyPlayedTrack[]>(`${this.baseUrl}/history`));
  }
}
