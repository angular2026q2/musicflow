import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { LucideDynamicIcon } from '@lucide/angular';
import { IconKey, ICONS } from '@shared/constants/icons';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-small-card',
  imports: [CardModule, LucideDynamicIcon],
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallCardComponent {
  readonly icon = input.required<IconKey>();
  readonly iconColor = input<string>();
  readonly iconBackgroundColor = input<string>();
  readonly title = input.required<string>();
  readonly description = input<string>();

  protected readonly config = computed(() => ICONS[this.icon()]);
}
