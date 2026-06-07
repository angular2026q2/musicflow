import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TracksResponce } from '@shared/interfaces/tracks-responce.interface';
import { TrackResponse } from '@shared/interfaces/track-responce.interface';
import { Track } from '@shared/interfaces/track.interface';
import { Genre } from '@shared/types/genre.type';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl = '/api/v1';
  private http = inject(HttpClient);

  getTrendingTracks() {
    return this.http.get<TrackResponse<Track>>(`${this.baseUrl}/music/tracks`, {
      params: {
        search: '?order=popularity_total',
        limit: '15',
        offset: '0',
      },
    });
  }

  getNewReleases() {
    return this.http.get<TrackResponse<Track>>(`${this.baseUrl}/music/tracks`, {
      params: {
        search: `?order=releasedate_desc`,
        limit: '10',
        offset: '0',
      },
    });
  }

  getGenres() {
    return of<Genre[]>([
      Genre.Rock,
      Genre.Electronic,
      Genre.Classical,
      Genre.AmbientNewAge,
      Genre.Filmscore,
      Genre.Advertising,
      Genre.Pop,
      Genre.Corporate,
      Genre.Alternative,
    ]);
  }

  getRecentlyPlayed() {
    return this.http.get<TracksResponce[]>(`${this.baseUrl}/history`);
  }
}
