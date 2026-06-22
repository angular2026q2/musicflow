import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-track-skeleton',
  imports: [SkeletonModule],
  templateUrl: './track.skeleton.html',
  styleUrl: '../track.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackSkeletonComponent {}
