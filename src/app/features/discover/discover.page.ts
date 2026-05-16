import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecentlyPlayedMenuPopup } from '@features/discover/components/dropdown-menu.component';

@Component({
  selector: 'app-discover-page',
  imports: [RecentlyPlayedMenuPopup],
  templateUrl: './discover.page.html',
  styleUrl: './discover.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverPage {}
