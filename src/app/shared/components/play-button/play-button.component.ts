import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { ICONS } from '@shared/constants/icons';

@Component({
  selector: 'app-play-button',
  imports: [LucideDynamicIcon],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayButtonComponent {
  playing = input(false);
  playToggle = output<void>();

  protected readonly ICONS = ICONS;
}
