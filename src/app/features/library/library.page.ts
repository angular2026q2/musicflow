import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LibraryService } from '@core/services/library.service';
import { MusicPlayerService } from '@core/services/music-player.service';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { PlaylistCardComponent } from '@shared/components/playlist-card/playlist-card.component';
import { PlaylistFormComponent } from '@shared/components/playlist-form/playlist-form.component';
import { TrackComponent } from '@shared/components/track/track.component';
import { HistoryGroup, HistoryRequest, HistoryResponse } from '@shared/interfaces/history';
import { Message } from '@shared/interfaces/message';
import { PlaylistResponse } from '@shared/interfaces/playlist.interface';
import { Track } from '@shared/interfaces/track.interface';
import { formatDate } from '@shared/utils/formatDate';
import { toLocalDateKey } from '@shared/utils/toLocalDateKey';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DatesSliderSkeletonComponent } from './skeleton/dates-slider.skeleton';
import { HistoryGroupSkeletonComponent } from './skeleton/history-group.skeleton';

@Component({
  selector: 'app-library',
  imports: [
    ButtonModule,
    MessageModule,
    TrackComponent,
    ChipModule,
    HistoryGroupSkeletonComponent,
    DatesSliderSkeletonComponent,
    PlaylistCardComponent,
    ErrorMessageComponent,
    ConfirmDialogModule,
    ToastModule,
    PlaylistFormComponent,
    DialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './library.page.html',
  styleUrl: './library.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPage {
  readonly PAGE_TITLE = 'Your Library';
  readonly PLAYLIST_SECTION_TITLE = 'Playlists';
  readonly HISTORY_SECTION_TITLE = 'Recently Played';

  visible = false;

  private readonly playerService = inject(MusicPlayerService);
  private readonly libraryService = inject(LibraryService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  readonly history = this.libraryService.history;
  readonly playlistsResource = this.libraryService.playlists;

  readonly groups = computed(() => {
    const entries = this.history.value() ?? [];
    const map = new Map<string, HistoryResponse[]>();

    for (const entry of entries) {
      const date = toLocalDateKey(entry.played_at);
      const tracks = map.get(date) ?? [];
      tracks.push(entry);
      map.set(date, tracks);
    }

    const groups: HistoryGroup[] = [];
    for (const [date, tracks] of map) {
      const unique = tracks.filter(
        (t, i, self) => i === self.findIndex((x) => x.track_id === t.track_id),
      );

      groups.push({
        date,
        label: formatDate(date),
        tracks: unique.map((t) => this.toTrack(t)),
      });
    }

    return groups.sort((a, b) => b.date.localeCompare(a.date));
  });

  readonly dateChips = computed(() => this.groups().map((g) => ({ date: g.date, label: g.label })));

  readonly playlistIsLoading = computed(() => this.libraryService.playlists.isLoading());
  readonly playlistError = computed(() => this.libraryService.playlists.error());

  readonly playlists = computed(
    () =>
      this.libraryService.playlists.value()?.map((playlist) => ({
        ...playlist,
        duration: (playlist.tracks ?? []).reduce((acc, track) => acc + track.duration, 0),
      })) ?? [],
  );
  readonly editingPlaylist = signal<PlaylistResponse | null>(null);

  reload(type: 'history' | 'playlist'): void {
    switch (type) {
      case 'history':
        this.history.reload();
        break;
      case 'playlist':
        this.playlistsResource.reload();
        break;
    }
  }

  toTrack(track: HistoryRequest): Track {
    return {
      id: track.track_id,
      name: track.track_name,
      artist_name: track?.artist_name ?? '',
      album_name: track?.album_name ?? '',
      album_image: track.album_image ?? '',
      audio: track.audio,
      duration: track.duration,

      album_id: '',
      artist_idstr: '',
      artist_id: '',
      license_ccurl: '',
      position: 0,
      releasedate: '',
      audiodownload: '',
      prourl: '',
      shorturl: '',
      shareurl: '',
      image: '',
      audiodownload_allowed: false,
      content_id_free: false,
    };
  }

  onTrackPlay(track: Track): void {
    const allTracks = this.groups().flatMap((g) => g.tracks);
    const index = allTracks.findIndex((t) => t.id === track.id);
    this.playerService.playQueue(allTracks, index);
  }

  scrollToDate(date: string): void {
    const element = document.getElementById('date-' + date);

    element?.scrollIntoView({ behavior: 'smooth' });
  }

  confirmDelete(playlist: PlaylistResponse): void {
    this.confirmationService.confirm({
      message: `Do you want to delete playlist '${playlist.name}'?`,
      header: 'Delete playlist',
      icon: 'pi pi-info-circle',
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

      accept: async () => {
        try {
          await this.libraryService.deletePlaylist(playlist.id);
          this.playlistsResource.value.update((list) =>
            list?.filter((item) => item.id !== playlist.id),
          );

          this.showToast({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Playlist deleted',
          });
        } catch {
          this.showToast({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete playlist',
          });
        }
      },
      reject: () => {
        this.showToast({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  editPlaylist(playlist: PlaylistResponse): void {
    this.editingPlaylist.set(playlist);
    this.visible = true;
  }

  showCreationForm(value = true): void {
    this.editingPlaylist.set(null);
    this.visible = value;
  }

  onPlaylistCreated(playlist: PlaylistResponse) {
    this.playlistsResource.value.update((list) => [...(list ?? []), playlist]);
  }

  onPlaylistUpdated(playlist: PlaylistResponse) {
    this.playlistsResource.value.update((list) =>
      list?.map((p) => (p.id === playlist.id ? { ...p, ...playlist } : p)),
    );
  }

  showToast(msg: Message): void {
    this.messageService.add(msg);
  }
}
