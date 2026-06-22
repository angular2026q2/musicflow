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
  icon = input.required<IconKey>();
  iconColor = input<string>();
  iconBackgroundColor = input<string>();
  title = input.required<string>();
  description = input<string>();

  protected readonly config = computed(() => ICONS[this.icon()]);
}
