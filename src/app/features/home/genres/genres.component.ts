import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SmallCardComponent } from '@shared/components/small-card/small-card.component';
import { Genre } from '@shared/types/genre.type';
import { findKeyByValue } from '@shared/utils/findKeyByValue';
import { IconKey, ICONS } from '@shared/constants/icons';

import { SubmitButtonComponent } from '@shared/components/submit-button/submit-button.component';

@Component({
  selector: 'app-genres',
  imports: [SmallCardComponent, SubmitButtonComponent],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresComponent {
  readonly genres = input.required<Genre[]>();
  readonly genreSelected = output<Genre>();

  getIcon(genre: string): IconKey {
    return (findKeyByValue(ICONS, genre, 'label') ?? 'music') as IconKey;
  }

  selectGenre(genre: Genre): void {
    this.genreSelected.emit(genre);
  }
}
