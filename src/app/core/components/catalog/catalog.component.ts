import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { CatalogCardComponent } from '@shared/components/catalog-card/catalog-card.component';
import { ICONS } from '@shared/constants/icons';
import { CatalogData } from '@shared/types/catalog-data.types';
import { Button } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-catalog',
  imports: [Button, CatalogCardComponent, MessageModule, LucideDynamicIcon],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
  readonly title = input.required<string>();
  readonly items = input<CatalogData[]>();
  readonly route = input.required<string>();
  readonly isLoading = input<boolean>();
  readonly isInitialLoading = input<boolean>();
  readonly error = input<Error>();

  readonly reload = output<void>();
  readonly loadMore = output<void>();

  readonly retryIcon = ICONS.retry.icon;
}
