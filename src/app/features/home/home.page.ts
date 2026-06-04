import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';

import { SmallCardComponent } from '@shared/components/small-card/small-card.component';

import { DropdownMenuComponent } from '@shared/components/dropdown/dropdown-menu.component';

import { ButtonModule } from 'primeng/button';
import { RecentlyPlayedComponent } from '@features/home/components/recently-played/recently-played.component';
import { HomeService } from '@core/services/home.service';
import { RecentlyPlayedTrack } from '@shared/interfaces/recently-played-track.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-home',
  imports: [
    SmallCardComponent,
    DropdownMenuComponent,
    CoverCardComponent,
    ButtonModule,
    RecentlyPlayedComponent,
    SkeletonModule,
    MessageModule,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  private homeService = inject(HomeService);

  recentTracks = signal<RecentlyPlayedTrack[]>([]);
  recentTracksLoading = signal(false);
  recentTracksError = signal<string | null>(null);

  ngOnInit() {
    this.loadRecentTracks();
  }

  loadRecentTracks() {
    this.recentTracksLoading.set(true);
    this.recentTracksError.set(null);

    this.homeService.getRecentlyPlayed().subscribe({
      next: (data) => {
        this.recentTracks.set(data);
      },
      error: () => {
        this.recentTracksError.set('Failed to load tracks. Please try again later.');
      },
      complete: () => this.recentTracksLoading.set(false),
    });
  }
}
