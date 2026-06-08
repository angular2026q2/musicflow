import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DurationPipe } from '@shared/pipes/duration.pipe';

@Component({
  selector: 'app-track-duration',
  imports: [DurationPipe],
  standalone: true,
  template: ` <span class="track-duration">
    {{ trackDuration() | duration }}
  </span>`,
  styles: [
    `
      .track-duration {
        font-size: var(--text-body-sm);
        color: var(--color-outline);
        text-align: right;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackDurationComponent {
  trackDuration = input<number>(0);
}
