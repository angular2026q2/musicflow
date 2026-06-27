import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { isMobileService } from '@core/services/isMobile.service';
import { TrackCardSkeletonComponent } from '@shared/components/track-card-skeleton/track-card-skeleton.component';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-search-skeleton',
  imports: [SkeletonModule, TrackCardSkeletonComponent],
  templateUrl: './search.skeleton.html',
  styleUrl: './search.skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSkeletonComponent {
  private readonly isMobileService = inject(isMobileService);
  readonly genresCount = input<number>();
  readonly isMobile = this.isMobileService.isMobile;
  readonly skeletonGenresItems = computed(() => Array.from({ length: this.genresCount() || 0 }));
  readonly skeletonTrackItems = Array.from({ length: 10 });
}
