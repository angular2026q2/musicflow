import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { LibraryService } from '@core/services/library.service';
import { MusicPlayerService } from '@core/services/music-player.service';
import { DropdownMenuComponent } from '@shared/components/dropdown/dropdown-menu.component';
import { TrackComponent } from '@shared/components/track/track.component';
import { Track } from '@shared/interfaces/track.interface';
import { toHistoryRequest } from '@shared/utils/toHistorRequest';
import { toTrack } from '@shared/utils/toTrack';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-playlist',
  imports: [ButtonModule, TrackComponent, DropdownMenuComponent],
  templateUrl: './playlist.page.html',
  styleUrl: './playlist.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistPage {
  private readonly playerService = inject(MusicPlayerService);
  private readonly libraryService = inject(LibraryService);
  private readonly location = inject(Location);
  private readonly messageService = inject(MessageService);

  readonly id = input.required<string>();

  readonly query = signal('');

  readonly playlist = computed(
    () => this.libraryService.playlists.value()?.find((p) => p.id === this.id()) ?? null,
  );

  readonly tracks = computed(() => this.playlist()?.tracks.map((t) => toTrack(t)) ?? []);

  createDropdownList(track: Track): MenuItem[] {
    return [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.delete(track),
      },
    ];
  }

  goBack(): void {
    this.location.back();
  }

  onTrackPlay(track: Track): void {
    const allTracks = this.tracks();
    const index = allTracks.findIndex((t) => t.id === track.id);
    this.playerService.playQueue(allTracks, index);
  }

  async delete(track: Track) {
    const playlist = this.playlist();
    if (playlist === null) return;

    const updatedTracks = playlist.tracks.filter((t) => t.track_id !== track.id);

    this.messageService.add({
      severity: 'info',
      summary: 'Deleting',
      detail: `Deleting '${track.name}'...`,
      sticky: true,
    });

    try {
      const payload = {
        name: playlist.name,
        description: playlist.description,
        tracks: updatedTracks.map((t) => toHistoryRequest(t)),
      };

      await this.libraryService.updatePlaylist(playlist.id, payload);
      this.libraryService.playlists.reload();

      this.messageService.clear();

      this.messageService.add({
        severity: 'success',
        summary: 'Track removed',
        detail: `“${track.name}” removed from ${playlist.name}`,
      });
    } catch {
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to remove track',
      });
    }
  }
}
