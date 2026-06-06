import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SmallCardComponent } from '@shared/components/small-card/small-card.component';
import { Genre } from '@shared/types/genre.type';
import { findKeyByValue } from '@shared/utils/findKeyByValue';
import { IconKey, ICONS } from '@shared/constants/icons';

@Component({
  selector: 'app-genres',
  imports: [SmallCardComponent, CommonModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresComponent {
  genres = input.required<Genre[]>();
  icons = ICONS;
  findKeyByValueFn = findKeyByValue;

  getIcon(genre: string): IconKey {
    const key = findKeyByValue(this.icons, genre, 'label');
    return (key ?? 'music') as IconKey;
  }

  getRandomColor() {
    return (
      '#' +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
    );
  }
}
