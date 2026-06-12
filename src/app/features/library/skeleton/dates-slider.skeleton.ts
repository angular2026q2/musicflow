import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-dates-slider-skeleton',
  imports: [SkeletonModule],
  templateUrl: './dates-slider.skeleton.html',
  styleUrl: '../library.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatesSliderSkeletonComponent {}
