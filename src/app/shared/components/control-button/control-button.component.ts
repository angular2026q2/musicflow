import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { IconKey, ICONS } from '@shared/constants/icons';
import { ButtonModule } from 'primeng/button';

/**
 * Компонент для создания кнопок управления.
 *
 * Рендерит иконку из реестра `ICONS` внутри PrimeNG `<p-button>` в text-варианте.
 * Поддерживает активное состояние (визуально подсвечивается).
 *
 * @property {IconKey} icon - Обязательное значение. Ключ иконки из реестра `ICONS`, отображаемой на кнопке.
 * @property {number} [size=20] - Размер иконки в пикселях (ширина и высота svg).
 * @property {boolean} [active=false] - Активное состояние кнопки. Иконка посвечивается при значении `true`.
 * @property {string} [ariaLabel] - Переопределяет `aria-label` кнопки. Если не задан —
 * используется label из реестра `ICONS`.
 *
 * @example
 * ```html
 * <app-control-button icon="play" ariaLabel="Play track" />
 *
 * <app-control-button
 *   icon="shuffle"
 *   (click)="toggleShuffle()"
 *   [active]="isShuffleOn()"
 *   [size]="24"
 * />
 * ```
 */

@Component({
  selector: 'app-control-button',
  imports: [ButtonModule, LucideDynamicIcon],
  templateUrl: './control-button.component.html',
  styleUrl: './control-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlButtonComponent {
  readonly icon = input.required<IconKey>();
  readonly size = input<number>(20);
  readonly active = input<boolean>(false);
  readonly ariaLabel = input<string>();
  readonly styleClass = input<string>('');

  protected readonly config = computed(() => ICONS[this.icon()]);
  protected readonly resolvedAriaLabel = computed(() => this.ariaLabel() ?? this.config().label);
  protected readonly styleClasses = computed(() => {
    const classes = ['control-button'];

    if (this.active()) classes.push('control-button--active');

    return classes.join(' ');
  });
}
