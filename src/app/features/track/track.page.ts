import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicPlayerService } from '@core/services/music-player.service';
import { DropdownMenuComponent } from '@shared/components/dropdown/dropdown-menu.component';
import { WaveFormComponent } from '@shared/components/wave-form/wave-form.component';
import { Track } from '@shared/interfaces/track.interface';
import { DurationPipe } from '@shared/pipes/duration.pipe';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-track-page',
  imports: [DurationPipe, DatePipe, WaveFormComponent, DropdownMenuComponent],
  templateUrl: './track.page.html',
  styleUrl: './track.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackPage {
  private readonly route = inject(ActivatedRoute);
  private readonly playerService = inject(MusicPlayerService);
  private readonly router = inject(Router);
  private readonly id = this.route.snapshot.paramMap.get('id');
  readonly trackResource = httpResource<Track>(() => `/api/v1/music/track/${this.id}`);

  constructor() {
    effect(() => {
      console.log('CURRENT:', this.playerService.currentTrack());
      console.log('QUEUE:', this.playerService.queue());
    });
  }

  readonly menuItems = computed<MenuItem[]>(() => {
    const track = this.trackResource.value();

    if (!track) return [];

    return [
      {
        label: 'Go to Artist',
        command: () => this.router.navigate(['/artist', track.artist_id]),
      },
      {
        label: 'Show Album',
        command: () => this.router.navigate(['/album', track.album_id]),
      },
    ];
  });
}
