import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SmallCardComponent } from '@shared/components/small-card/small-card.component';
import { Genre } from '@shared/types/genre.type';
import { findKeyByValue } from '@shared/utils/findKeyByValue';
import { IconKey, ICONS } from '@shared/constants/icons';
import { getRandomColor } from '@shared/utils/getRandomColor';

@Component({
  selector: 'app-genres',
  imports: [SmallCardComponent, CommonModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresComponent {
  genres = input.required<Genre[]>();
  readonly genreSelected = output<Genre>();
  icons = ICONS;
  findKeyByValueFn = findKeyByValue;

  getIcon(genre: string): IconKey {
    const key = findKeyByValue(this.icons, genre, 'label');
    return (key ?? 'music') as IconKey;
  }

  selectGenre(genre: Genre): void {
    this.genreSelected.emit(genre);
  }

  getRandomColor = getRandomColor;
}
