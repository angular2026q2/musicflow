import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { LibraryService } from '@core/services/library.service';
import { MusicPlayerService } from '@core/services/music-player.service';
import { TrackComponent } from '@shared/components/track/track.component';
import { Track } from '@shared/interfaces/track.interface';
import { toTrack } from '@shared/utils/toTrack';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-playlist',
  imports: [ButtonModule, TrackComponent],
  templateUrl: './playlist.page.html',
  styleUrl: './playlist.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistPage {
  private readonly playerService = inject(MusicPlayerService);
  private readonly libraryService = inject(LibraryService);
  private readonly location = inject(Location);

  readonly id = input.required<string>();
  readonly query = signal('');

  readonly playlist = computed(
    () => this.libraryService.playlists.value()?.find((p) => p.id === this.id()) ?? null,
  );

  readonly tracks = computed(() => this.playlist()?.tracks.map((t) => toTrack(t)) ?? []);

  goBack(): void {
    this.location.back();
  }

  onTrackPlay(track: Track): void {
    const allTracks = this.tracks();
    const index = allTracks.findIndex((t) => t.id === track.id);
    this.playerService.playQueue(allTracks, index);
  }
}
