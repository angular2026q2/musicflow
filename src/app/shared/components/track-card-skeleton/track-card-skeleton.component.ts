import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-track-card-skeleton',
  imports: [SkeletonModule],
  templateUrl: './track-card-skeleton.component.html',
  styleUrl: './track-card-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCardSkeletonComponent {}
