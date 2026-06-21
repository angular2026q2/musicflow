import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TrackCardComponent } from '@shared/components/track-card/track-card.component';
import { TracksResponce } from '@shared/interfaces/tracks-responce.interface';

@Component({
  selector: 'app-track-list',
  imports: [TrackCardComponent],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  tracks = input.required<TracksResponce[]>();
}
