import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicPlayerService } from '@core/services/music-player.service';
import { DropdownMenuComponent } from '@shared/components/dropdown/dropdown-menu.component';
import { TrackComponent } from '@shared/components/track/track.component';
import { WaveFormComponent } from '@shared/components/wave-form/wave-form.component';
import { Track } from '@shared/interfaces/track.interface';
import { DurationPipe } from '@shared/pipes/duration.pipe';
import { MenuItem } from 'primeng/api';
import { buildAlbumPath, buildArtistPath } from '@shared/constants/routes';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PlayButtonComponent } from '@shared/components/play-button/play-button.component';
import { ControlsBarComponent } from '@shared/components/controls-bar/controls-bar.component';
import { isMobileService } from '@core/services/isMobile.service';
@Component({
  selector: 'app-track-page',
  imports: [
    DurationPipe,
    DatePipe,
    WaveFormComponent,
    DropdownMenuComponent,
    TrackComponent,
    PlayButtonComponent,
    ControlsBarComponent,
  ],
  templateUrl: './track.page.html',
  styleUrl: './track.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackPage {
  private readonly route = inject(ActivatedRoute);
  private readonly playerService = inject(MusicPlayerService);
  private readonly isMobileService = inject(isMobileService);
  private readonly router = inject(Router);
  readonly id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))), {
    initialValue: null,
  });
  readonly trackResource = httpResource<Track>(() => `/api/v1/music/track/${this.id()}`);
  readonly isMobile = this.isMobileService.isMobile;
  readonly queue = this.playerService.queue;

  readonly isCurrentTrackPlaying = computed(() => {
    return (
      this.playerService.isPlaying() &&
      this.playerService.currentTrack()?.id === this.trackResource.value()?.id
    );
  });
  protected readonly isActive = computed(() => this.playerService.isPlaying());
  protected readonly isShuffle = computed(() => this.playerService.isShuffle());
  protected readonly repeatMode = computed(() => this.playerService.repeatMode());
  protected readonly isFavorite = signal<boolean>(false);

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
        command: () => this.router.navigateByUrl(buildArtistPath(track.artist_id)),
      },
      {
        label: 'Show Album',
        command: () => this.router.navigateByUrl(buildAlbumPath(track.album_id)),
      },
    ];
  });

  readonly showAllQueue = signal(false);
  readonly hasMoreQueue = computed(() => {
    return this.queue().length > 10;
  });
  readonly visibleQueue = computed(() => {
    const queue = this.queue();

    return this.showAllQueue() ? queue : queue.slice(0, 10);
  });

  toggleQueue(): void {
    this.showAllQueue.update((value) => !value);
  }

  onTrackPlay(track: Track): void {
    const index = this.queue().findIndex((item) => item.id === track.id);
    this.playerService.playQueue(this.queue(), index);
  }

  onPlayClick(track: Track): void {
    if (this.isCurrentTrackPlaying()) {
      this.playerService.togglePlay();
    } else {
      this.playerService.playTrack(track);
    }
  }

  onPrev(): void {
    this.playerService.previous();
  }

  onNext(): void {
    this.playerService.next();
  }

  onShuffleToggle(): void {
    this.playerService.toggleShuffle();
  }

  onRepeatToggle(): void {
    this.playerService.toggleRepeat();
  }

  toggleFavorite(): void {
    this.isFavorite.update((v) => !v);
  }
}
