import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { HomeService } from '@core/services/home.service';

import { RecentlyPlayedComponent } from '@features/home/components/recently-played/recently-played.component';
import { GenresComponent } from './components/genres/genres.component';
import { TrackCardsComponent } from './components/track-cards/track-cards.component';

import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

import type { RecentlyPlayedTrack } from '@shared/interfaces/recently-played-track.interface';
import type { Track } from '@shared/interfaces/track.interface';
import type { Genre } from '@shared/types/genre.type';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    RecentlyPlayedComponent,
    GenresComponent,
    TrackCardsComponent,
    SkeletonModule,
    MessageModule,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly messageService = inject(MessageService);

  readonly isLoading = signal<boolean>(true);
  readonly trendingTracks = signal<Track[]>([]);
  readonly newReleases = signal<Track[]>([]);
  readonly recentTracks = signal<RecentlyPlayedTrack[]>([]);
  readonly genres = signal<Genre[]>([]);

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.loadTrendingTracks(),
      this.loadNewReleases(),
      this.loadRecentTracks(),
      this.loadGenres(),
    ]);
    this.isLoading.set(false);
  }

  private async loadTrendingTracks(): Promise<void> {
    try {
      const response = await this.homeService.getTrendingTracks();
      this.trendingTracks.set(response.data);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load trending tracks.',
        life: 4000,
      });
    }
  }

  private async loadNewReleases(): Promise<void> {
    try {
      const response = await this.homeService.getNewReleases();
      this.newReleases.set(response.data);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load new releases.',
        life: 4000,
      });
    }
  }

  private async loadRecentTracks(): Promise<void> {
    try {
      const response = await this.homeService.getRecentlyPlayed();
      this.recentTracks.set(response);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load recently played tracks.',
        life: 4000,
      });
    }
  }

  private async loadGenres(): Promise<void> {
    try {
      const response = await this.homeService.getGenres();
      this.genres.set(response);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load genres.',
        life: 4000,
      });
    }
  }
}
