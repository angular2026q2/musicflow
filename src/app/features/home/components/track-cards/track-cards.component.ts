import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';
import { TrackDurationComponent } from '@shared/components/track-duration/track-duration.component';
import { Track } from '@shared/interfaces/track.interface';

@Component({
  selector: 'app-track-cards',
  imports: [TrackDurationComponent, CoverCardComponent],
  templateUrl: './track-cards.component.html',
  styleUrl: './track-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCardsComponent {
  title = input('');
  tracks = input.required<Track[]>();
}
