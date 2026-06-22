import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DropdownMenuComponent } from '@shared/components/dropdown/dropdown-menu.component';
import { MenuItem } from 'primeng/api';
import { ItemDetailsComponent } from '@shared/components/item-details/item-details.component';
import { RecentTrack } from '@shared/interfaces/recent-track.interface';
import { TrackDurationComponent } from '@shared/components/track-duration/track-duration.component';

@Component({
  selector: 'app-track-card',
  imports: [DropdownMenuComponent, ItemDetailsComponent, TrackDurationComponent],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCardComponent {
  track = input.required<RecentTrack>();
  menuItems: MenuItem[] = [
    { label: 'Add to favorites', icon: 'pi pi-heart-fill' },
    { label: 'View artist', icon: 'pi pi-user-plus' },
    { label: 'Remove from recents', icon: 'pi pi-trash' },
  ];
}
