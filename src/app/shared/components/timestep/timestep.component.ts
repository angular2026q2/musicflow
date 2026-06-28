import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicPlayerService } from '@core/services/music-player.service';
import { DurationPipe } from '@shared/pipes/duration.pipe';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-timestep',
  imports: [SliderModule, FormsModule, DurationPipe],
  templateUrl: './timestep.component.html',
  styleUrl: './timestep.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimestepComponent {
  private readonly playerService = inject(MusicPlayerService);

  protected readonly currentTime = this.playerService.currentTime;
  protected readonly duration = this.playerService.duration;

  readonly formattedCurrentTime = computed(() => this.playerService.currentTime());
  readonly formattedDuration = computed(() => this.playerService.duration());

  onSeek(value: number): void {
    this.playerService.seekTo(value);
  }
}
