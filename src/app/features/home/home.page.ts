import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecentlyPlayedMenuPopup } from './components/dropdown-menu.component';

@Component({
  selector: 'app-home',
  imports: [RecentlyPlayedMenuPopup],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
