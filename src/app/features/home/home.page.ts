import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SmallCardComponent } from '@shared/components/small-card/small-card.component';
import { RecentlyPlayedMenuPopup } from './components/dropdown-menu.component';

@Component({
  selector: 'app-home',
  imports: [SmallCardComponent, RecentlyPlayedMenuPopup],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
