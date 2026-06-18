import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Playlist } from '@shared/interfaces/playlist.interface';
import { DurationPipe } from '@shared/pipes/duration.pipe';
import { MenuItem } from 'primeng/api';
import { DropdownMenuComponent } from '../dropdown/dropdown-menu.component';

@Component({
  selector: 'app-playlist-card',
  imports: [DurationPipe, DropdownMenuComponent],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistCardComponent {
  readonly data = input.required<Playlist>();
  readonly delete = output<Playlist>();

  readonly dropdownList: MenuItem[] = [
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.delete.emit(this.data()),
    },
  ];
}
