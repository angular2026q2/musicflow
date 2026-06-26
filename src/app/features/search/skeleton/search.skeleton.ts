import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { isMobilervice } from '@core/services/isMobile.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-search-skeleton',
  imports: [SkeletonModule],
  templateUrl: './search.skeleton.html',
  styleUrl: './search.skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSkeletonComponent {
  private readonly isMobileService = inject(isMobilervice);
  readonly genresCount = input<number>();
  readonly isMobile = this.isMobileService.isMobile;
  readonly skeletonGenresItems = computed(() => Array.from({ length: this.genresCount() || 0 }));
  readonly skeletonTrackItems = Array.from({ length: 10 });
}
