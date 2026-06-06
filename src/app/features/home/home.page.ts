import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { catchError, finalize, of } from 'rxjs';

import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';
import { SmallCardComponent } from '@shared/components/small-card/small-card.component';
import { DropdownMenuComponent } from '@shared/components/dropdown/dropdown-menu.component';
import { RecentlyPlayedComponent } from '@features/home/components/recently-played/recently-played.component';

import { HomeService } from '@core/services/home.service';
import { RecentlyPlayedTrack } from '@shared/interfaces/recently-played-track.interface';

import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { Track } from '@shared/interfaces/track.interface';
import { Genre } from '@shared/types/genre.type';
import { GenresComponent } from './components/genres/genres.component';
import { NewRealeseComponent } from './components/new-releases/new-releases.component';
import { TrendingComponent } from './components/trending/trending.component';

@Component({
  selector: 'app-home',
  imports: [
    SmallCardComponent,
    DropdownMenuComponent,
    CoverCardComponent,
    ButtonModule,
    RecentlyPlayedComponent,
    GenresComponent,
    NewRealeseComponent,
    TrendingComponent,
    SkeletonModule,
    MessageModule,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private homeService = inject(HomeService);

  recentTracksLoading = signal(true);
  recentTracksError = signal<string | null>(null);

  trendingTracks = toSignal(
    this.homeService.getTrendingTracks().pipe(
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

  newReleases = toSignal(
    this.homeService.getNewReleases().pipe(
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
    this.homeService.getGenres().pipe(
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
        return of<RecentlyPlayedTrack[]>([]);
      }),
      finalize(() => {
        this.recentTracksLoading.set(false);
      }),
    ),
    {
      initialValue: [],
    },
  );
}
