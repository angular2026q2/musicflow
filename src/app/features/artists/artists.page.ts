import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { CatalogComponent } from '@core/components/catalog/catalog.component';
import { Artist } from '@shared/interfaces/artist.interface';
import { CatalogResponse } from '@shared/interfaces/catalog.interface';
import { CatalogData } from '@shared/types/catalog-data.types';

@Component({
  selector: 'app-artists',
  imports: [CatalogComponent],
  templateUrl: './artists.page.html',
  styleUrl: './artists.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistsPage {
  readonly PAGE_TITLE = 'Artists';

  readonly limit = signal(10);
  readonly offset = signal(0);
  readonly accumulated = signal<CatalogData[]>([]);
  readonly artists = this.accumulated.asReadonly();

  readonly artistsResource = httpResource<CatalogResponse<Artist>>(() => ({
    url: '/api/v1/music/artists',
    params: {
      limit: this.limit(),
      offset: this.offset(),
    },
  }));

  readonly hasArtists = computed(() => this.artists().length > 0);
  readonly isInitialLoading = computed(
    () => this.artistsResource.isLoading() && !this.hasArtists(),
  );
  readonly isLoading = computed(() => this.artistsResource.isLoading() && this.hasArtists());
  readonly error = computed(() => this.artistsResource.error());

  constructor() {
    effect(() => {
      const data = this.artistsResource
        .value()
        ?.data.map((item) => ({ ...item, type: 'artist' as const }));

      if (data) {
        this.accumulated.update((artists) => [...artists, ...data]);
      }
    });
  }

  loadMore() {
    this.offset.update((v) => v + this.limit());
  }
}
