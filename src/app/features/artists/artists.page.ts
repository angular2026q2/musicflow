import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogComponent } from '@core/components/catalog/catalog.component';
import { CatalogService } from '@core/services/catalog.service';
import { Artist } from '@shared/interfaces/artist.interface';

@Component({
  selector: 'app-artists',
  imports: [CatalogComponent],
  templateUrl: './artists.page.html',
  styleUrl: './artists.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistsPage {
  readonly PAGE_TITLE = 'Artists';

  private readonly catalogService = inject(CatalogService);

  readonly catalog = this.catalogService.createCatalog<Artist>({
    type: 'artist',
    endpoint: 'artists',
  });
}
