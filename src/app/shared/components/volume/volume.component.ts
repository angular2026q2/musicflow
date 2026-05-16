import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconKey } from '@shared/constants/icons';
import { SliderModule } from 'primeng/slider';
import { ControlButtonComponent } from '../control-button/control-button.component';

@Component({
  selector: 'app-volume',
  imports: [ControlButtonComponent, SliderModule, FormsModule],
  templateUrl: './volume.component.html',
  styleUrl: './volume.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VolumeComponent {
  private readonly DEFAULT_VOLUME_VALUE = 50;

  readonly volume = signal(this.DEFAULT_VOLUME_VALUE);
  private readonly volumeBeforeMute = signal(this.DEFAULT_VOLUME_VALUE);
  private readonly isMuted = computed(() => this.volume() === 0);

  readonly iconKey = computed<IconKey>(() => {
    if (this.isMuted() || this.volume() === 0) return 'volumeOff';
    if (this.volume() < this.DEFAULT_VOLUME_VALUE) return 'volumeDown';

    return 'volumeUp';
  });
  readonly ariaLabel = computed(() => (this.isMuted() ? 'Enable sound' : 'Disable sound'));

  toggleMute(): void {
    if (this.isMuted()) {
      this.volume.set(this.volumeBeforeMute());
    } else {
      this.volumeBeforeMute.set(this.volume());
      this.volume.set(0);
    }
  }
}
