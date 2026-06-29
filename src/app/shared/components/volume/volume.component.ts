import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { MusicPlayerService } from '@core/services/music-player.service';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';
import { IconKey } from '@shared/constants/icons';

@Component({
  selector: 'app-volume',
  imports: [ControlButtonComponent, SliderModule, FormsModule],
  templateUrl: './volume.component.html',
  styleUrl: './volume.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VolumeComponent {
  private readonly DEFAULT_VOLUME_VALUE = 50;

  private readonly playerService = inject(MusicPlayerService);

  readonly volume = signal(this.DEFAULT_VOLUME_VALUE);
  private readonly volumeBeforeMute = signal(this.DEFAULT_VOLUME_VALUE);

  private readonly isMuted = computed(() => this.volume() === 0);
  readonly iconKey = computed<IconKey>(() => {
    if (this.isMuted() || this.volume() === 0) return 'volumeOff';
    if (this.volume() < this.DEFAULT_VOLUME_VALUE) return 'volumeDown';

    return 'volumeUp';
  });
  readonly ariaLabel = computed(() => (this.isMuted() ? 'Enable sound' : 'Disable sound'));

  constructor() {
    effect(() => {
      this.playerService.setVolume(this.volume());
    });
  }

  toggleMute(): void {
    if (this.isMuted()) {
      this.volume.set(this.volumeBeforeMute());
    } else {
      this.volumeBeforeMute.set(this.volume());
      this.volume.set(0);
    }
  }
}
