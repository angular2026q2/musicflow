import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SmallCardComponent } from '@shared/components/small-card/small-card.component';

import { ICONS } from '@shared/constants/icons';
import { findKeyByValue } from '@shared/utils/findKeyByValue';
import { getRandomColor } from '@shared/utils/getRandomColor';

import type { IconKey } from '@shared/constants/icons';
import type { Genre } from '@shared/types/genre.type';

@Component({
  selector: 'app-genres',
  imports: [SmallCardComponent],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresComponent {
  readonly genres = input.required<Genre[]>();

  protected readonly getRandomColor = getRandomColor;

  protected getIcon(genre: string): IconKey {
    const key = findKeyByValue(ICONS, genre, 'label');
    return (key ?? 'music') as IconKey;
  }
}
