import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { catchError, finalize, of } from 'rxjs';

import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';
import { SmallCardComponent } from '@shared/components/small-card/small-card.component';
import { DropdownMenuComponent } from '@shared/components/dropdown/dropdown-menu.component';
import { RecentlyPlayedComponent } from '@shared/components/recently-played/recently-played.component';

import { HomeService } from '@core/services/home.service';
import { RecentlyPlayedTrack } from '@shared/interfaces/recently-played-track.interface';

import { ButtonModule } from 'primeng/button';
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
export class HomePage {
  private homeService = inject(HomeService);

  recentTracksLoading = signal(true);
  recentTracksError = signal<string | null>(null);

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
