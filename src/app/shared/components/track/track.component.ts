import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { ICONS } from '@shared/constants/icons';

import { buildAlbumPath, buildArtistPath } from '@shared/constants/routes';
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
  readonly track = input.required<Track>();
  readonly position = input<number | null>(null);
  readonly showImage = input<boolean>(false);
  readonly meta = input<TrackMetaField[]>([]);

  /** todo: PlayCountPipe будет использоваться когда API начнёт отдавать поле plays */

  artistLink(artistId: string): string {
    return buildArtistPath(artistId);
  }

  albumLink(albumId: string): string {
    return buildAlbumPath(albumId);
  }

  protected readonly ICONS = ICONS;
}
