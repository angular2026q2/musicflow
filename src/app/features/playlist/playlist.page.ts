import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '@core/services/library.service';
import { MusicPlayerService } from '@core/services/music-player.service';
import { DropdownMenuComponent } from '@shared/components/dropdown/dropdown-menu.component';
import { TrackComponent } from '@shared/components/track/track.component';
import { APP_ROUTES } from '@shared/constants/routes';
import { Track } from '@shared/interfaces/track.interface';
import { toHistoryRequest } from '@shared/utils/toHistorRequest';
import { toTrack } from '@shared/utils/toTrack';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-playlist',
  imports: [
    ButtonModule,
    TrackComponent,
    DropdownMenuComponent,
    ConfirmDialogModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
  ],
  providers: [ConfirmationService],
  templateUrl: './playlist.page.html',
  styleUrl: './playlist.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistPage {
  private readonly playerService = inject(MusicPlayerService);
  private readonly libraryService = inject(LibraryService);
  private readonly location = inject(Location);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly confirmationService = inject(ConfirmationService);

  readonly id = input.required<string>();

  readonly query = signal('');

  readonly playlist = computed(
    () => this.libraryService.playlists.value()?.find((p) => p.id === this.id()) ?? null,
  );

  readonly tracks = computed(() => this.playlist()?.tracks.map((t) => toTrack(t)) ?? []);
  readonly orderedTracks = signal<Track[]>([]);

  constructor() {
    effect(() => {
      this.orderedTracks.set(this.tracks());
    });
  }

  createDropdownList(track: Track): MenuItem[] {
    return [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.handleDelete(track),
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

  handleDelete(track: Track): void {
    const playlist = this.playlist();
    if (playlist === null) return;

    const isLastTrack = playlist.tracks.length === 1;

    if (isLastTrack) {
      this.confirmDeleteLastTrack(track);
    } else {
      this.deleteTrack(track);
    }
  }

  confirmDeleteLastTrack(track: Track): void {
    const playlist = this.playlist();
    if (playlist === null) return;

    this.confirmationService.confirm({
      message: `“${track.name}” is the last track. Removing it will delete the playlist “${playlist.name}”. Continue?`,
      header: 'Delete playlist',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => this.deletePlaylist(playlist.id, playlist.name),
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  async deletePlaylist(id: string, name: string): Promise<void> {
    this.messageService.add({
      severity: 'info',
      summary: 'Deleting',
      detail: `Deleting playlist '${name}'...`,
      sticky: true,
    });

    try {
      await this.libraryService.deletePlaylist(id);
      this.libraryService.playlists.value.update((list) => list?.filter((p) => p.id !== id));

      this.messageService.clear();
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: `Playlist '${name}' deleted`,
      });

      this.router.navigate([APP_ROUTES.LIBRARY.route]);
    } catch {
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete playlist',
      });
    }
  }

  async deleteTrack(track: Track): Promise<void> {
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

  drop(event: CdkDragDrop<Track[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    const tracks = [...this.orderedTracks()];
    moveItemInArray(tracks, event.previousIndex, event.currentIndex);

    this.orderedTracks.set(tracks);

    this.saveOrder(this.orderedTracks());
  }

  async saveOrder(tracks: Track[]): Promise<void> {
    const playlist = this.playlist();
    if (!playlist) return;

    const ordered = tracks
      .map((track) => playlist.tracks.find((t) => t.track_id === track.id))
      .filter((t) => t != null)
      .map((t) => toHistoryRequest(t!));

    try {
      const payload = {
        name: playlist.name,
        description: playlist.description,
        tracks: ordered,
      };

      await this.libraryService.updatePlaylist(playlist.id, payload);
      this.libraryService.playlists.reload();
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to reorder track',
      });
    }
  }
}
