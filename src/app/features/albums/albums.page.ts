import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';
import { ICONS } from '@shared/constants/icons';
import { Album } from '@shared/interfaces/album.interface';
import { Albums } from '@shared/interfaces/albums.interface';
import { Button } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-albums',
  imports: [CoverCardComponent, DatePipe, RouterLink, LucideDynamicIcon, MessageModule, Button],
  templateUrl: './albums.page.html',
  styleUrl: './albums.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsPage {
  readonly PAGE_TITLE = 'Albums';

  readonly limit = signal(5);
  readonly offset = signal(0);
  readonly accumulatedAlbums = signal<Album[]>([]);
  readonly albums = this.accumulatedAlbums.asReadonly();

  readonly albumsResource = httpResource<Albums>(() => ({
    url: '/api/v1/music/albums',
    params: {
      limit: this.limit(),
      offset: this.offset(),
    },
  }));

  readonly hasAlbums = computed(() => this.albums().length > 0);
  readonly isInitialLoading = computed(() => this.albumsResource.isLoading() && !this.hasAlbums());
  readonly isLoading = computed(() => this.albumsResource.isLoading() && this.hasAlbums());
  readonly error = computed(() => this.albumsResource.error());

  readonly retryIcon = ICONS.retry.icon;

  constructor() {
    effect(() => {
      const data = this.albumsResource.value()?.data;

      if (data) {
        this.accumulatedAlbums.update((albums) => [...albums, ...data]);
      }
    });
  }

  loadMore() {
    this.offset.update((v) => v + this.limit());
  }
}
