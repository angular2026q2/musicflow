import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

/**
 * @description
 * Контейнер с картинкой на фоне и скругленимяи углов, который размещает
 * переданные компоненты в левом нижнем углу
 *
 * @input backgroundImage
 *
 * @example
 * ```html
 *    <app-cover-card
 *      [backgroundImage]="'https://images.unsplash.com/photo-1541701494587-cb58502866ab'"
 *    >
 *      <p class="discovery-trending__label">hot release</p>
 *      <h3 class="discovery-trending__title">Boom!</h3>
 *      <div class="discovery-trending__description">
 *        <span>Description</span>
 *        ·
 *       <span>Description 2</span>
 *     </div>
 *   </app-cover-card>
 * ```
 *
 * @usage
 * Компонент может использоваться на страницах:
 * - library,
 * — search
 * – artist profile
 * – home
 *
 */

@Component({
  selector: 'app-cover-card',
  imports: [CardModule],
  template: `
    <p-card styleClass="cover-card" [style.background-image]="'url(' + backgroundImage() + ')'">
      <ng-content> </ng-content>
    </p-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .cover-card {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        position: relative;
      }
      .cover-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          var(--color-surface) 0%,
          color-mix(in srgb, var(--color-surface) 45%, transparent) 25%,
          color-mix(in srgb, var(--color-surface) 0%, transparent) 60%
        );
        pointer-events: none;
      }
    `,
  ],
})
export class CoverCardComponent {
  backgroundImage = input<string>('');
}
