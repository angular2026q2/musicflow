import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { IconKey } from '@shared/constants/icons';
import { ControlButtonComponent } from '../control-button/control-button.component';
import { TimestepComponent } from '../timestep/timestep.component';

type RepeatMode = 'none' | 'all' | 'one';
const REPEAT_NEXT: Record<RepeatMode, RepeatMode> = {
  none: 'all',
  all: 'one',
  one: 'none',
};

@Component({
  selector: 'app-controls-bar',
  imports: [TimestepComponent, ControlButtonComponent],
  templateUrl: './controls-bar.component.html',
  styleUrl: './controls-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsBarComponent {
  readonly trackDuration = input<number>(225);
  readonly isPlaying = input<boolean>(false);

  readonly isShuffle = signal<boolean>(false);
  readonly repeatMode = signal<RepeatMode>('none');

  readonly playToggle = output<void>();

  readonly iconPlay = computed<IconKey>(() => (this.isPlaying() ? 'pause' : 'play'));
  readonly iconRepeat = computed<IconKey>(() =>
    this.repeatMode() === 'one' ? 'repeatOne' : 'repeat',
  );

  toggleMusicPlay(): void {
    this.playToggle.emit();
  }

  toggleRepeat(): void {
    this.repeatMode.update((s) => REPEAT_NEXT[s]);
  }

  toggleShuffle(): void {
    this.isShuffle.update((v) => !v);
  }

  previousTrack(): void {
    // !TODO: написать функционал
  }

  nextTrack(): void {
    // !TODO: написать функционал
  }
}
