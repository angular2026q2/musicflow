import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Location, NgOptimizedImage } from '@angular/common';
import { ICONS } from '@shared/constants/icons';

@Component({
  selector: 'app-sub-header',
  imports: [NgOptimizedImage],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubHeaderComponent {
  private readonly location = inject(Location);

  readonly imageUrl = input.required<string>();
  readonly imageVariant = input<'square' | 'rounded'>('square');
  readonly kind = input<string>(''); // это будут 'Album' | 'Artist' | 'Track'...
  readonly title = input.required<string>();
  readonly showBackButton = input<boolean>(true);

  goBack(): void {
    this.location.back();
  }

  protected readonly ICONS = ICONS;
}
