import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogComponent } from '@core/components/catalog/catalog.component';
import { CatalogService } from '@core/services/catalog.service';
import { Album } from '@shared/interfaces/album.interface';

@Component({
  selector: 'app-albums',
  imports: [CatalogComponent],
  templateUrl: './albums.page.html',
  styleUrl: './albums.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsPage {
  readonly PAGE_TITLE = 'Albums';

  private readonly catalogService = inject(CatalogService);

  readonly catalog = this.catalogService.createCatalog<Album>({
    type: 'album',
    endpoint: 'albums',
  });
}
