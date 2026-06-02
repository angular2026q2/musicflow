import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArtistService } from '@core/services/artist.service';
import { LucideDynamicIcon } from '@lucide/angular';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';
import { TrackComponent } from '@shared/components/track/track.component';
import { IconKey, ICONS } from '@shared/constants/icons';
import { buildAlbumPath } from '@shared/constants/routes';
import { Album } from '@shared/interfaces/album.interface';
import { Artist } from '@shared/interfaces/artist.interface';
import { Track } from '@shared/interfaces/track.interface';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-artist',
  imports: [
    LucideDynamicIcon,
    // DropdownMenuComponent,
    ControlButtonComponent,
    DividerModule,
    TrackComponent,
    ButtonModule,
    CoverCardComponent,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './artist.page.html',
  styleUrl: './artist.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPage {
  readonly ENTITY_LABEL = 'Artist';

  readonly artistService = inject(ArtistService);

  readonly id = input.required<string>();

  readonly artistResource = httpResource<Artist>(() => this.artistService.getArtistUrl(this.id()));
  readonly allAlbumsResource = httpResource<{ data: Album[] }>(() => `/api/v1/music/albums`); // Заменить на this.artistService.getAlbumsUrl(this.id())
  readonly allTracksResource = httpResource<{ data: Track[] }>(() => `/api/v1/music/tracks`); // Заменить на this.artistService.getTracksUrl(this.id())

  readonly showAll = signal(false);

  readonly artist = computed(() => this.artistResource.value() ?? null);
  private readonly allTracks = computed<Track[]>(
    () =>
      this.allTracksResource.value()?.data.filter((track) => track.artist_id === this.id()) ?? [],
  );
  // !TODO: временное решение для подсчета загруженных треков
  // нужно добавить на бэке поле tracks_count или другое поле с количеством треков в альбоме
  readonly trackCountByAlbum = computed<Map<string, number>>(() => {
    const tracks = this.allTracksResource.value()?.data ?? [];
    const map = new Map<string, number>();

    for (const track of tracks) {
      map.set(track.album_id, (map.get(track.album_id) ?? 0) + 1);
    }

    return map;
  });

  readonly tracks = computed(() =>
    this.showAll() ? this.allTracks() : this.allTracks().slice(0, 10),
  );

  readonly albums = computed(() => {
    const all = this.allAlbumsResource.value()?.data ?? [];
    return all.filter((album) => album.artist_id === this.id());
  });

  readonly avatarFallback = computed(() => (this.artist()?.name[0] ?? '').toUpperCase());

  readonly isPlay = signal<boolean>(false);
  readonly iconPlay = computed<IconKey>(() => (this.isPlay() ? 'pause' : 'play'));
  readonly isFollowing = signal<boolean>(false);

  readonly albumsIcon = ICONS.playlist.icon;
  // !TODO: добавить функционал копирования и может еще что то
  // readonly dropDownMenuItems: MenuItem[] = [
  //   {
  //     label: 'Shared',
  //   },
  //   {
  //     label: 'About artist',
  //   },
  // ];

  toggleMusicPlay(): void {
    this.isPlay.update((v) => !v);
  }

  toggleFollow(): void {
    this.isFollowing.update((v) => !v);
  }

  toggleShowAll(): void {
    this.showAll.update((v) => !v);
  }

  albumLink(albumId: string): string {
    return buildAlbumPath(albumId);
  }
}
