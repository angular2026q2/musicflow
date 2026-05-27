import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';
import { DropdownMenuComponent } from '@shared/components/dropdown/dropdown-menu.component';
import { IconKey, ICONS } from '@shared/constants/icons';
import { Artist } from '@shared/interfaces/artist';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';

const ARTIST_STUB: Artist = {
  avatar: '/images/team/team-member-1.webp',
  cover: '/images/team/team-member-1.webp',
  name: 'John Doe',
  albumCount: 2,
  bio: 'short bio',
};

@Component({
  selector: 'app-artist',
  imports: [LucideDynamicIcon, DropdownMenuComponent, ControlButtonComponent, DividerModule],
  templateUrl: './artist.page.html',
  styleUrl: './artist.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPage {
  readonly ENTITY_LABEL = 'Artist';

  readonly artist = signal<Artist | null>(ARTIST_STUB);
  readonly avatarFallback = computed(() => (this.artist()?.name[0] ?? '').toUpperCase());

  readonly isPlay = signal<boolean>(false);
  readonly iconPlay = computed<IconKey>(() => (this.isPlay() ? 'pause' : 'play'));
  readonly isFollowing = signal<boolean>(false);

  readonly albumsIcon = ICONS.playlist.icon;

  readonly dropDownMenuItems: MenuItem[] = [
    {
      label: 'Shared',
    },
    {
      label: 'About artist',
    },
  ];

  toggleMusicPlay(): void {
    this.isPlay.update((v) => !v);
  }

  toggleFollow(): void {
    this.isFollowing.update((v) => !v);
  }
}
