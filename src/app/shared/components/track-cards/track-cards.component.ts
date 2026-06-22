import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';
import { TrackDurationComponent } from '@shared/components/track-duration/track-duration.component';
import { Track } from '@shared/interfaces/track.interface';
import { MusicPlayerService } from '@core/services/music-player.service';
import { isMobilervice } from '@core/services/isMobile.service';
import { MobileCoverCardComponent } from '../cover-card-mobile/cover-card-mobile.component';
import { OverlayDirective } from '@shared/directives/overlay.directive';
import { PlayButtonComponent } from '../play-button/play-button.component';

@Component({
  selector: 'app-track-cards',
  imports: [
    TrackDurationComponent,
    CoverCardComponent,
    MobileCoverCardComponent,
    OverlayDirective,
    PlayButtonComponent,
  ],
  templateUrl: './track-cards.component.html',
  styleUrl: './track-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCardsComponent {
  title = input('');
  tracks = input.required<Track[]>();
  private readonly playerService = inject(MusicPlayerService);
  private readonly isMobileService = inject(isMobilervice);
  readonly isPlaying = computed(() => this.playerService.isPlaying());
  readonly isMobile = this.isMobileService.isMobile;

  togglePlay(track: Track): void {
    const currentTrack = this.playerService.currentTrack();
    if (currentTrack?.id === track.id) {
      this.playerService.togglePlay();
      return;
    }

    const queue = this.tracks();
    const index = queue.findIndex((item) => item.id === track.id);
    this.playerService.playQueue(queue, index);
  }

  isCurrentTrack(track: Track): boolean {
    return this.playerService.currentTrack()?.id === track.id;
  }
}
