import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LibraryService } from '@core/services/library.service';
import { MusicPlayerService } from '@core/services/music-player.service';
import { LucideDynamicIcon } from '@lucide/angular';
import { TrackComponent } from '@shared/components/track/track.component';
import { ICONS } from '@shared/constants/icons';
import { HistoryGroup, HistoryRequest, HistoryResponse } from '@shared/interfaces/history';
import { Track } from '@shared/interfaces/track.interface';
import { formatDate } from '@shared/utils/formatDate';
import { toLocalDateKey } from '@shared/utils/toLocalDateKey';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-library',
  imports: [ButtonModule, MessageModule, LucideDynamicIcon, TrackComponent, ChipModule],
  templateUrl: './library.page.html',
  styleUrl: './library.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPage {
  readonly PAGE_TITLE = 'Your Library';
  readonly PLAYLIST_SECTION_TITLE = 'Playlists';
  readonly HISTORY_SECTION_TITLE = 'Recently Played';
  readonly retryIcon = ICONS.retry.icon;

  private readonly playerService = inject(MusicPlayerService);
  private readonly libraryService = inject(LibraryService);

  readonly history = this.libraryService.history;
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

  reload(): void {
    this.history.reload();
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
}
