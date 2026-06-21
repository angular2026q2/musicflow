import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TrackSkeletonComponent } from '@shared/components/track/skeleton/track.skeleton';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-history-group-skeleton',
  imports: [SkeletonModule, TrackSkeletonComponent],
  templateUrl: './history-group.skeleton.html',
  styleUrl: '../library.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryGroupSkeletonComponent {}
