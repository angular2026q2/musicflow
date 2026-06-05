import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Универсальный UI-компонент для отображения элемента с обложкой и текстовой информацией.
 *
 * @description
 * Отображает изображение (обложку), заголовок и до двух строк описания.
 * Поддерживает различные варианты отображения изображения и заголовка.
 *
 * Компонент является "глупым" (presentational) и полностью управляется входными данными.
 *
 * @input imageUrl         URL изображения (обложки)
 * @input imageVariant     Вариант отображения изображения:
 *                        - 'square'   — квадрат (по умолчанию)
 *                        - 'squareXl' — увеличенный квадрат
 *                        - 'rounded'  — круг
 *
 * @input title            Заголовок (обязательный)
 * @input titleVariant     Вариант отображения заголовка:
 *                        - 'bold'   — жирный (по умолчанию)
 *                        - 'normal' — обычный
 *
 * @input primaryDesc      Основное описание (опционально)
 * @input secondaryDesc    Дополнительное описание (опционально)
 *
 * @remarks
 * Если `primaryDesc` или `secondaryDesc` не переданы, соответствующие элементы не рендерятся.
 *
 * @example
 * ```html
 * <app-item-details
 *   [imageUrl]="'https://upload.wikimedia.org/wikipedia/ru/9/99/More_Pink_Floyd_Cover.jpg'"
 *   [title]="'Pink Floyd'"
 *   [primaryDesc]="'Progressive Rock'"
 *   [secondaryDesc]="'1970s'"
 *   [imageVariant]="'rounded'"
 *   [titleVariant]="'normal'"
 * />
 * ```4
 *
 * @usage
 * Компонент может использоваться в различных UI-сценариях:
 * - списки (library, recently added)
 * - профиль пользователя (recently played, top artists)
 * - player bar / full player
 * - страницы артиста и discovery
 */
type ImageVariant = 'rounded' | 'square' | 'squareXl';
type TitleVariant = 'normal' | 'bold';
@Component({
  selector: 'app-item-details',
  imports: [NgClass],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent {
  imageUrl = input<string>('');
  title = input.required<string>();
  imageVariant = input<ImageVariant>('square');
  titleVariant = input<TitleVariant>('bold');
  primaryDesc = input<string>('');
  secondaryDesc = input<string>('');
}
