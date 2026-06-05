import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { CatalogComponent } from '@shared/components/catalog/catalog.component';
import { ICONS } from '@shared/constants/icons';
import { Album } from '@shared/interfaces/album.interface';
import { CatalogResponse } from '@shared/interfaces/catalog.interface';
import { CatalogData } from '@shared/types/catalog-data.types';

@Component({
  selector: 'app-albums',
  imports: [CatalogComponent],
  templateUrl: './albums.page.html',
  styleUrl: './albums.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsPage {
  readonly PAGE_TITLE = 'Albums';

  readonly limit = signal(10);
  readonly offset = signal(0);
  readonly accumulated = signal<CatalogData[]>([]);
  readonly albums = this.accumulated.asReadonly();

  readonly albumsResource = httpResource<CatalogResponse<Album>>(() => ({
    url: '/api/v1/music/albums',
    params: {
      limit: this.limit(),
      offset: this.offset(),
    },
  }));

  readonly hasAlbums = computed(() => this.albums().length > 0);
  readonly isInitialLoading = computed(() => this.albumsResource.isLoading() && !this.hasAlbums());
  readonly isLoading = computed(() => this.albumsResource.isLoading() && this.hasAlbums());
  readonly error = computed(() => this.albumsResource.error());

  readonly retryIcon = ICONS.retry.icon;

  constructor() {
    effect(() => {
      const data = this.albumsResource
        .value()
        ?.data.map((item) => ({ ...item, type: 'album' as const }));

      if (data) {
        this.accumulated.update((albums) => [...albums, ...data]);
      }
    });
  }

  loadMore() {
    this.offset.update((v) => v + this.limit());
  }
}
