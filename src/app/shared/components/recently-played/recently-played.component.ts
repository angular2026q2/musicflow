import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TrackCardComponent } from '../track-card/track-card.component';
import { RecentlyPlayedTrack } from '@shared/interfaces/recently-played-track.interface';

@Component({
  selector: 'app-recently-played',
  imports: [TrackCardComponent],
  templateUrl: './recently-played.component.html',
  styleUrl: './recently-played.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyPlayedComponent {
  tracks = input.required<RecentlyPlayedTrack[]>();
}
