import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MusicPlayerService } from '@core/services/music-player.service';
import { LucideDynamicIcon } from '@lucide/angular';
import { ICONS } from '@shared/constants/icons';

import { buildAlbumPath, buildArtistPath, buildTrackPath } from '@shared/constants/routes';
import { DurationPipe } from '@shared/pipes/duration.pipe';
// import { PlayCountPipe } from '@shared/pipes/play-count.pipe';
import type { Track } from '@shared/interfaces/track.interface';

type TrackMetaField = 'album' | 'artist' | 'releasedate';

@Component({
  selector: 'app-track',
  imports: [RouterLink, LucideDynamicIcon, DurationPipe, DatePipe, NgOptimizedImage],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackComponent {
  private readonly playerService = inject(MusicPlayerService);

  readonly track = input.required<Track>();
  readonly position = input<number | null>(null);
  readonly showImage = input<boolean>(false);
  readonly meta = input<TrackMetaField[]>([]);
  readonly playTrack = output<Track>();
  readonly isCurrentlyPlaying = computed(
    () =>
      this.playerService.isPlaying() && this.playerService.currentTrack()?.id === this.track().id,
  );

  protected readonly ICONS = ICONS;
  /** todo: PlayCountPipe будет использоваться когда API начнёт отдавать поле plays */

  onPlayClick(): void {
    if (this.isCurrentlyPlaying()) {
      this.playerService.togglePlay();
    } else {
      this.playTrack.emit(this.track());
    }
  }

  artistLink(artistId: string): string {
    return buildArtistPath(artistId);
  }

  albumLink(albumId: string): string {
    return buildAlbumPath(albumId);
  }

  trackLink(trackId: string): string {
    return buildTrackPath(trackId);
  }
}
