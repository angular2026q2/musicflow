import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicPlayerService } from '@core/services/music-player.service';
import { WaveFormComponent } from '@shared/components/wave-form/wave-form.component';
import { Track } from '@shared/interfaces/track.interface';
import { DurationPipe } from '@shared/pipes/duration.pipe';
@Component({
  selector: 'app-track-page',
  imports: [DurationPipe, DatePipe, WaveFormComponent],
  templateUrl: './track.page.html',
  styleUrl: './track.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackPage {
  private readonly route = inject(ActivatedRoute);
  private readonly playerService = inject(MusicPlayerService);
  private readonly id = this.route.snapshot.paramMap.get('id');
  readonly trackResource = httpResource<Track>(() => `/api/v1/music/track/${this.id}`);

  constructor() {
    effect(() => {
      console.log('CURRENT:', this.playerService.currentTrack());
      console.log('QUEUE:', this.playerService.queue());
    });
  }
}
