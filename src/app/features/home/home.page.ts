import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, map, of } from 'rxjs';
import { TrackListComponent } from '@shared/components/track-list/track-list.component';
import { HomeService } from '@core/services/home.service';

import { TracksResponce } from '@shared/interfaces/tracks-responce.interface';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { Track } from '@shared/interfaces/track.interface';
import { Genre } from '@shared/types/genre.type';
import { GenresComponent } from './genres/genres.component';
import { TrackCardsComponent } from '@shared/components/track-cards/track-cards.component';
import { GenreService } from '@core/services/genre.service';
import { Router } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { TrackResponse } from '@shared/interfaces/track-responce.interface';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    TrackListComponent,
    GenresComponent,
    TrackCardsComponent,
    SkeletonModule,
    MessageModule,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private homeService = inject(HomeService);
  private genreService = inject(GenreService);
  private router = inject(Router);
  readonly limit = signal(10);
  readonly offset = signal(0);
  recentTracksLoading = signal(true);
  recentTracksError = signal<string | null>(null);

  // trendingTracks = toSignal(
  //   this.homeService.getTrendingTracks().pipe(
  //     map((response) => response.data),
  //     catchError((e) => {
  //       console.log(e);
  //       return of<Track[]>([]);
  //     }),
  //     finalize(() => {
  //       this.recentTracksLoading.set(false);
  //     }),
  //   ),
  //   {
  //     initialValue: [],
  //   },
  // );

  readonly trendingTracksResource = httpResource<TrackResponse<Track>>(() => ({
    url: this.homeService.getTracksUrl(),
    params: {
      search: '?order=popularity_total',
      limit: this.limit(),
      offset: this.offset(),
    },
  }));

  readonly trendingTracks = computed(() => this.trendingTracksResource.value()?.data ?? []);

  newReleases = toSignal(
    this.homeService.getNewReleases().pipe(
      map((response) => response.data),
      catchError((e) => {
        console.log(e);
        return of<Track[]>([]);
      }),
      finalize(() => {
        this.recentTracksLoading.set(false);
      }),
    ),
    {
      initialValue: [],
    },
  );

  genres = toSignal(
    this.genreService.getGenres().pipe(
      catchError((e) => {
        console.log(e);
        return of<Genre[]>([]);
      }),
      finalize(() => {
        this.recentTracksLoading.set(false);
      }),
    ),
    {
      initialValue: [],
    },
  );

  recentTracks = toSignal(
    this.homeService.getRecentlyPlayed().pipe(
      catchError(() => {
        this.recentTracksError.set('Failed to load tracks. Please try again later.');
        return of<TracksResponce[]>([]);
      }),
      finalize(() => {
        this.recentTracksLoading.set(false);
      }),
    ),
    {
      initialValue: [],
    },
  );

  searchByGenre(genre: Genre): void {
    this.router.navigate(['/search'], {
      queryParams: {
        tags: genre,
      },
    });
  }
}
