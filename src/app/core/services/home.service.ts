import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecentlyPlayedTrack } from '@shared/interfaces/recently-played-track.interface';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl = '/api/v1';
  private http = inject(HttpClient);

  getRecentlyPlayed() {
    return this.http.get<RecentlyPlayedTrack[]>(`${this.baseUrl}/history`).pipe(
      catchError((error) => {
        console.log('HomeService:' + error);
        throw error;
      }),
    );
  }
}

// Popular Tracks
// 10–15 tracks sorted by popularity GET /v3.0/tracks?order=popularity_total
// album cover, title, artist name, duration (in mm:ss format).
// no playcount
// Play
// If a track is already playing — visual indication

//A "New Releases" section — a list of 10 tracks sorted by date (GET /v3.0/tracks?order=releasedate_desc).
//Card format is the same as Popular Tracks.

//genres

//recently
