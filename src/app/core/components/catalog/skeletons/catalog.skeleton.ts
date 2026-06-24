import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CatalogCardSkeleton } from '@shared/components/catalog-card/skeletons/catalog-card.skeleton';

@Component({
  selector: 'app-catalog-skeleton',
  imports: [CatalogCardSkeleton],
  templateUrl: './catalog.skeleton.html',
  styleUrl: '../catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSkeleton {
  readonly items: string[] = Array.from({ length: 20 }, (_, i) => `Item ${i}`);
}
