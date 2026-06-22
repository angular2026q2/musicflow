import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-profile-skeleton',
  imports: [SkeletonModule],
  templateUrl: './profile.skeleton.html',
  styleUrl: '../profile.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSkeletonComponent {}
