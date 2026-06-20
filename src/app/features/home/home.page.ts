import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  AfterViewInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

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
import { TrackComponent } from '@shared/components/track/track.component';
import { MusicPlayerService } from '@core/services/music-player.service';

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
    TrackComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements AfterViewInit {
  private homeService = inject(HomeService);
  private genreService = inject(GenreService);
  private readonly authService = inject(AuthService);
  private readonly playerService = inject(MusicPlayerService);

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
    // if (!this.authService.isAuthenticated()) {
    //   return undefined;
    // }

    return this.homeService.getHistoryUrl();
  });

  readonly trendingTracks = computed(() => this.trendingTracksResource.value()?.data ?? []);
  readonly newReleases = computed(() => this.newReleasesResource.value()?.data ?? []);
  // readonly recentTracks = computed(() => this.recentTracksResource.value() ?? []);
  readonly recentTracks = computed(() => {
    const tracks = this.recentTracksResource.value() ?? [];

    console.log('recent:', tracks);

    return tracks;
  });

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('loading:', this.recentTracksResource.isLoading());

      console.log('error:', this.recentTracksResource.error());

      console.log('value:', this.recentTracksResource.value());
    });
  }

  readonly genres = toSignal(this.genreService.getGenres(), {
    initialValue: [],
  });

  searchByGenre(genre: Genre): void {
    this.router.navigate(['/search'], {
      queryParams: {
        tags: genre,
      },
    });
  }

  toTrack(track: RecentTrack): Track {
    return {
      id: track.id,
      name: track.track_name,
      duration: track.duration,
      artist_id: '',
      artist_name: track.artist_name,
      artist_idstr: '',
      album_name: track.album_name,
      album_id: '',
      license_ccurl: '',
      position: 0,
      releasedate: '',
      album_image: track.album_image,
      audio: track.audio,
      audiodownload: '',
      prourl: '',
      shorturl: '',
      shareurl: '',
      image: track.album_image,
      audiodownload_allowed: false,
      content_id_free: false,
    };
  }

  onTrackPlay(track: RecentTrack): void {
    const queue = this.recentTracks().map((item) => this.toTrack(item));
    const index = queue.findIndex((item) => item.id === track.id);
    this.playerService.playQueue(queue, index);
  }
}
