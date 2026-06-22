import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArtistService } from '@core/services/artist.service';
import { MusicPlayerService } from '@core/services/music-player.service';
import { LucideDynamicIcon } from '@lucide/angular';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';
import { TrackComponent } from '@shared/components/track/track.component';
import { ICONS } from '@shared/constants/icons';
import { buildAlbumPath } from '@shared/constants/routes';
import { Album } from '@shared/interfaces/album.interface';
import { Artist } from '@shared/interfaces/artist.interface';
import { Track } from '@shared/interfaces/track.interface';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ArtistSkeletonPage } from './skeleton/artist.skeleton';

@Component({
  selector: 'app-artist',
  imports: [
    LucideDynamicIcon,
    // DropdownMenuComponent,
    DividerModule,
    TrackComponent,
    ButtonModule,
    CoverCardComponent,
    DatePipe,
    RouterLink,
    LucideDynamicIcon,
    ArtistSkeletonPage,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './artist.page.html',
  styleUrl: './artist.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPage {
  private readonly PREVIEW_TRACKS_COUNT = 10;
  readonly ENTITY_LABEL = 'Artist';
  readonly albumsIcon = ICONS.playlist.icon;
  readonly retryIcon = ICONS.retry.icon;

  readonly artistService = inject(ArtistService);
  readonly playerService = inject(MusicPlayerService);

  readonly id = input.required<string>();

  readonly artistResource = httpResource<Artist>(() => this.artistService.getArtistUrl(this.id()));
  readonly allAlbumsResource = httpResource<{ data: Album[] }>(() =>
    this.artistService.getAlbumsUrl(this.id()),
  );
  readonly allTracksResource = httpResource<{ data: Track[] }>(() =>
    this.artistService.getTracksUrl(this.id()),
  );

  readonly showAll = signal(false);
  readonly isPlay = computed(() => this.playerService.isPlaying());
  readonly isFollowing = signal<boolean>(false);

  readonly artist = computed(() => this.artistResource.value());
  private readonly allTracks = computed<Track[]>(() => this.allTracksResource.value()?.data ?? []);
  readonly trackCountByAlbum = computed<Map<string, number>>(() => {
    const tracks = this.allTracks();
    const map = new Map<string, number>();

    for (const track of tracks) {
      map.set(track.album_id, (map.get(track.album_id) ?? 0) + 1);
    }

    return map;
  });

  readonly tracks = computed(() =>
    this.showAll() ? this.allTracks() : this.allTracks().slice(0, this.PREVIEW_TRACKS_COUNT),
  );

  readonly albums = computed(() => {
    return this.allAlbumsResource.value()?.data ?? [];
  });

  readonly avatarFallback = computed(() => (this.artist()?.name[0] ?? '').toUpperCase());
  readonly isAllTracksPlaying = computed(
    () =>
      this.playerService.isPlaying() &&
      this.playerService.currentTrack()?.artist_id === this.artist()?.id,
  );

  // !TODO: добавить функционал копирования и может еще что то
  // readonly dropDownMenuItems: MenuItem[] = [
  //   {
  //     label: 'Shared',
  //   },
  //   {
  //     label: 'About artist',
  //   },
  // ];

  readonly isLoading = computed(() => this.artistResource.isLoading());
  readonly error = computed(() => this.artistResource.error());

  onAllTracksPlay(): void {
    if (this.isAllTracksPlaying()) {
      this.playerService.togglePlay();
    } else {
      this.playerService.playQueue(this.allTracks().map((t) => this.toTrack(t)));
    }
  }

  toTrack(track: Track): Track {
    const artist = this.artist();
    return {
      ...track,
      artist_id: artist?.id ?? '',
      artist_name: artist?.name ?? '',
      artist_idstr: '',
      position: 0,
      prourl: '',
      shorturl: '',
      shareurl: '',
      content_id_free: false,
    };
  }

  onTrackPlay(track: Track): void {
    const index = this.allTracks().indexOf(track);
    this.playerService.playQueue(
      this.allTracks().map((t) => this.toTrack(t)),
      index,
    );
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

  reload(): void {
    this.allAlbumsResource.reload();
  }
}
