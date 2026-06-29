import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-catalog-card-skeleton',
  imports: [SkeletonModule],
  templateUrl: './catalog-card.skeleton.html',
  styleUrl: '../catalog-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogCardSkeleton {}
