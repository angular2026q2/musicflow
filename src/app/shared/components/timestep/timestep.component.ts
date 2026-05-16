import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-timestep',
  imports: [SliderModule, FormsModule],
  templateUrl: './timestep.component.html',
  styleUrl: './timestep.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimestepComponent {
  readonly trackDuration = input<number>(225);
  readonly currentTime = signal<number>(0);

  readonly formattedCurrentTime = computed(() => this.formatTime(this.currentTime()));
  readonly formattedDuration = computed(() => this.formatTime(this.trackDuration()));

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
