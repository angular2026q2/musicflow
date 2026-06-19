import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';
import { TrackDurationComponent } from '@shared/components/track-duration/track-duration.component';
import { Track } from '@shared/interfaces/track.interface';

import { ICONS } from '@shared/constants/icons';
import { LucideDynamicIcon } from '@lucide/angular';
import { MusicPlayerService } from '@core/services/music-player.service';
@Component({
  selector: 'app-track-cards',
  imports: [TrackDurationComponent, CoverCardComponent, LucideDynamicIcon],
  templateUrl: './track-cards.component.html',
  styleUrl: './track-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCardsComponent {
  title = input('');
  tracks = input.required<Track[]>();
  private readonly playerService = inject(MusicPlayerService);
  protected readonly ICONS = ICONS;
  readonly isPlaying = computed(() => this.playerService.isPlaying());

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
