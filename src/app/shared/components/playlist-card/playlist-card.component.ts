import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Playlist } from '@shared/interfaces/playlist.interface';
import { DurationPipe } from '@shared/pipes/duration.pipe';

@Component({
  selector: 'app-playlist-card',
  imports: [DurationPipe],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistCardComponent {
  readonly data = input.required<Playlist & { duration: number }>();
}
