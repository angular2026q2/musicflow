import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { IconKey } from '@shared/constants/icons';
import { ControlButtonComponent } from '../control-button/control-button.component';
import { TimestepComponent } from '../timestep/timestep.component';
import type { RepeatMode } from '@core/services/music-player.service';

@Component({
  selector: 'app-controls-bar',
  imports: [TimestepComponent, ControlButtonComponent],
  templateUrl: './controls-bar.component.html',
  styleUrl: './controls-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsBarComponent {
  readonly isPlaying = input<boolean>(false);
  readonly isShuffle = input<boolean>(false);
  readonly repeatMode = input<RepeatMode>('none');

  readonly prev = output<void>();
  readonly next = output<void>();
  readonly shuffleToggle = output<void>();
  readonly repeatToggle = output<void>();

  readonly playToggle = output<void>();

  readonly iconPlay = computed<IconKey>(() => (this.isPlaying() ? 'pause' : 'play'));
  readonly iconRepeat = computed<IconKey>(() =>
    this.repeatMode() === 'one' ? 'repeatOne' : 'repeat',
  );

  toggleMusicPlay(): void {
    this.playToggle.emit();
  }

  onPrev(): void {
    this.prev.emit();
  }
  onNext(): void {
    this.next.emit();
  }

  toggleRepeat(): void {
    this.repeatToggle.emit();
  }

  toggleShuffle(): void {
    this.shuffleToggle.emit();
  }
}
