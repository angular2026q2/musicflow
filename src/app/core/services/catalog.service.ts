import { httpResource } from '@angular/common/http';
import {
  computed,
  effect,
  inject,
  Injectable,
  Injector,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { CatalogResponse } from '@shared/interfaces/catalog.interface';
import { CatalogData } from '@shared/types/catalog-data.types';
import { API_CONFIG, BUILD_URL } from 'src/app/api.tokens';

type CatalogEndpoint = 'albums' | 'artists';
type CatalogType = 'album' | 'artist';

interface CreateCatalogOptions {
  endpoint: CatalogEndpoint;
  type: CatalogType;
  limit?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly config = inject(API_CONFIG);
  private readonly buildUrl = inject(BUILD_URL);
  private readonly injector = inject(Injector);

  createCatalog<T>(options: CreateCatalogOptions) {
    const limit = signal(options.limit ?? 15);
    const offset = signal(0);
    const accumulated = signal<CatalogData[]>([]);

    const data = accumulated.asReadonly();

    const resource = runInInjectionContext(this.injector, () =>
      httpResource<CatalogResponse<T>>(() => ({
        url: this.buildUrl(`music/${this.getPath(options.endpoint)}`),
        params: {
          limit: limit(),
          offset: offset(),
        },
      })),
    );

    const hasData = computed(() => data().length > 0);
    const isInitialLoading = computed(() => resource.isLoading() && !hasData());
    const error = computed(() => resource.error());

    effect(
      () => {
        const response = resource.value();

        if (!response) {
          return;
        }

        const mappedData = response.data.map((item) => ({
          ...item,
          type: options.type,
        })) as unknown as CatalogData[];

        accumulated.update((data) => [...data, ...mappedData]);
      },
      {
        injector: this.injector,
      },
    );

    const loadMore = (): void => {
      if (resource.isLoading()) {
        return;
      }

      offset.update((v) => v + limit());
    };

    const reload = (): void => {
      resource.reload();
    };

    return {
      data,
      resource,
      hasData,
      isInitialLoading,
      error,
      loadMore,
      reload,
    };
  }

  getPath(endpoint: CatalogEndpoint) {
    return endpoint === 'albums' ? this.config.path.albums : this.config.path.artists;
  }
}
