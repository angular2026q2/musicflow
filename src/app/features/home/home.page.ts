import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of } from 'rxjs';
import { TrackListComponent } from '@shared/components/track-list/track-list.component';
import { HomeService } from '@core/services/home.service';
import { RecentTrack } from '@shared/interfaces/recent-track.interface';
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
import { CatalogResponse } from '@shared/interfaces/catalog.interface';
import { ErrorComponent } from '@shared/components/error/error.component';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    TrackListComponent,
    GenresComponent,
    TrackCardsComponent,
    SkeletonModule,
    MessageModule,
    ErrorComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private homeService = inject(HomeService);
  private genreService = inject(GenreService);
  private readonly authService = inject(AuthService);

  readonly isAuthenticated = this.authService.isAuthenticated;
  private router = inject(Router);
  readonly limit = signal(10);
  readonly offset = signal(0);

  readonly trendingTracksResource = httpResource<CatalogResponse<Track>>(() => ({
    url: this.homeService.getTracksUrl(),
    params: {
      search: '?order=popularity_total',
      limit: this.limit(),
      offset: this.offset(),
    },
  }));

  readonly newReleasesResource = httpResource<CatalogResponse<Track>>(() => ({
    url: this.homeService.getTracksUrl(),
    params: {
      search: '?order=releasedate_desc',
      limit: this.limit(),
      offset: this.offset(),
    },
  }));

  readonly recentTracksResource = httpResource<RecentTrack[]>(() => {
    if (!this.authService.isAuthenticated()) {
      return undefined;
    }

    return this.homeService.getHistoryUrl();
  });

  readonly trendingTracks = computed(() => this.trendingTracksResource.value()?.data ?? []);
  readonly newReleases = computed(() => this.newReleasesResource.value()?.data ?? []);
  readonly recentTracks = computed(() => this.recentTracksResource.value() ?? []);

  genres = toSignal(
    this.genreService.getGenres().pipe(
      catchError((e) => {
        console.log(e);
        return of<Genre[]>([]);
      }),
      finalize(() => console.log('ok')),
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
