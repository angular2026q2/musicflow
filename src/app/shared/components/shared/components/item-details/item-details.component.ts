import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Компонент для деталей item с обложкой и слотами.
 * 
 * @description
 * контейнер с изображением, заголовком и описанием.
 * Изображение 3 формы:
 * квадрат m
 * квадрарт xl
 * круг
 * 
 *
 * header в жирном и обычном начертании
 * desc1, desc2. 
 * desc2 опционально, если не передать их при вызове — не отрисуются
 *
 * Подойдет для
 * music library / recently added
 * user profile / recently played & top artists
 * player bar
 * artist profile
 * discovery
 * full player
 * 
 * @example
 *<app-item-details
 * [imageUrl]="'https://upload.wikimedia.org/wikipedia/ru/9/99/More_Pink_Floyd_Cover.jpg'"
 * [title]="'Динамический заголовок'"
 * [primaryDesc]="'Описание primary'"
 * [secondaryDesc]="'Описание secondary'"
 * [imageVariant]="'rounded'"
 * [titleVariant]="'normal'"
 *</app-item-details>
 * 

 */

@Component({
  selector: 'app-item-details',
  imports: [NgClass],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent {
  imageUrl = input<string>('');
  imageVariant = input<'rounded' | 'square' | 'squareXl'>('square');
  title = input.required<string>();
  titleVariant = input<'bold' | 'normal'>('bold');
  primaryDesc = input<string>('');
  secondaryDesc = input<string>('');
}
