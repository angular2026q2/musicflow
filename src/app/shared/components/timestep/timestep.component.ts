import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { MusicPlayerService } from '@core/services/music-player.service';

@Component({
  selector: 'app-timestep',
  imports: [SliderModule, FormsModule],
  templateUrl: './timestep.component.html',
  styleUrl: './timestep.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimestepComponent {
  private readonly playerService = inject(MusicPlayerService);

  protected readonly currentTime = this.playerService.currentTime;
  protected readonly duration = this.playerService.duration;

  readonly formattedCurrentTime = computed(() => this.formatTime(this.playerService.currentTime()));
  readonly formattedDuration = computed(() => this.formatTime(this.playerService.duration()));

  onSeek(value: number): void {
    this.playerService.seekTo(value);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
