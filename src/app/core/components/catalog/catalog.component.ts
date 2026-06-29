import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CatalogCardComponent } from '@shared/components/catalog-card/catalog-card.component';
import { ErrorComponent } from '@shared/components/error/error.component';
import { ICONS } from '@shared/constants/icons';
import { CatalogData } from '@shared/types/catalog-data.types';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MessageModule } from 'primeng/message';
import { CatalogSkeleton } from './skeletons/catalog.skeleton';

@Component({
  selector: 'app-catalog',
  imports: [
    CatalogCardComponent,
    MessageModule,
    CatalogSkeleton,
    InfiniteScrollDirective,
    ErrorComponent,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
  readonly title = input.required<string>();
  readonly items = input<CatalogData[]>();
  readonly route = input.required<string>();
  readonly isInitialLoading = input<boolean>();
  readonly error = input<Error>();

  readonly reload = output<void>();
  readonly scrolled = output<void>();

  readonly retryIcon = ICONS.retry.icon;
}
