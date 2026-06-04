import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MusicPlayerService } from '@core/services/music-player.service';
import { LucideDynamicIcon } from '@lucide/angular';

import { buildArtistPath } from '@shared/constants/routes';
import { ICONS } from '@shared/constants/icons';

import type { Album } from '@shared/interfaces/album.interface';
import type { AlbumTrack } from '@shared/interfaces/album-track.interface';
import type { Track } from '@shared/interfaces/track.interface';

import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';

import { SubHeaderComponent } from '@shared/components/sub-header/sub-header.component';
import { TrackComponent } from '@shared/components/track/track.component';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';
import { DurationPipe } from '@shared/pipes/duration.pipe';

@Component({
  selector: 'app-album',
  imports: [
    DatePipe,
    RouterLink,
    SubHeaderComponent,
    TrackComponent,
    SkeletonModule,
    MessageModule,
    LucideDynamicIcon,
    ControlButtonComponent,
    DurationPipe,
  ],
  templateUrl: './album.page.html',
  styleUrl: './album.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumPage {
  private readonly playerService = inject(MusicPlayerService);
  readonly id = input.required<string>();

  readonly albumResource = httpResource<Album>(() =>
    this.id() ? `/api/v1/music/albums/${this.id()}` : undefined,
  );

  readonly tracksResource = httpResource<AlbumTrack[]>(() =>
    this.id() ? `/api/v1/music/albums/${this.id()}/tracks` : undefined,
  );

  readonly album = computed(() => this.albumResource.value());
  readonly tracks = computed(() => this.tracksResource.value() ?? []);

  readonly isLoading = computed(
    () => this.albumResource.isLoading() || this.tracksResource.isLoading(),
  );
  readonly error = computed(() => this.albumResource.error() ?? this.tracksResource.error());

  /**
   * @description Calculates total album duration from tracks.
   * @returns 'Xh YY min' if >= 1h, otherwise 'YY min'.
   *
   * @note todo: DurationPipe handles seconds→mm:ss but total needs different format - keeping local here
   */
  readonly totalDuration = computed(() => {
    const trackList = this.tracks();
    if (!trackList.length) return 0;
    return trackList.reduce((sum, t) => sum + parseInt(t.duration, 10), 0);
  });

  toTrack(albumTrack: AlbumTrack): Track {
    const album = this.album();
    return {
      id: albumTrack.id,
      name: albumTrack.name,
      duration: parseInt(albumTrack.duration, 10),
      artist_id: album?.artist_id ?? '',
      artist_name: album?.artist_name ?? '',
      artist_idstr: '',
      album_name: album?.name ?? '',
      album_id: this.id(),
      license_ccurl: albumTrack.license_ccurl,
      position: parseInt(albumTrack.position, 10),
      releasedate: album?.releasedate ?? '',
      album_image: album?.image ?? '',
      audio: albumTrack.audio,
      audiodownload: albumTrack.audiodownload,
      prourl: '',
      shorturl: '',
      shareurl: '',
      image: album?.image ?? '',
      audiodownload_allowed: albumTrack.audiodownload_allowed,
      content_id_free: false,
    };
  }

  artistLink(artistId: string): string {
    return buildArtistPath(artistId);
  }

  onTrackPlay(albumTrack: AlbumTrack): void {
    const allTracks = this.tracks().map((t) => this.toTrack(t));
    const index = this.tracks().indexOf(albumTrack);
    this.playerService.playQueue(allTracks, index);
  }

  onAlbumPlay(): void {
    this.playerService.playQueue(this.tracks().map((t) => this.toTrack(t)));
  }

  protected readonly ICONS = ICONS;
}
