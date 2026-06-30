import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TrackCardSkeletonComponent } from '@shared/components/track-card-skeleton/track-card-skeleton.component';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-track-skeleton',
  imports: [SkeletonModule, TrackCardSkeletonComponent],
  templateUrl: './track.skeleton.html',
  styleUrls: ['./track.skeleton.scss', '../track.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackSkeletonComponent {}
