import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';

import { SmallCardComponent } from '@shared/components/small-card/small-card.component';
import { DropdownMenuComponent } from '../../shared/components/dropdown/dropdown-menu.component';

import { ButtonModule } from 'primeng/button';
import { RecentlyPlayedComponent } from '@shared/components/recently-played/recently-played.component';

@Component({
  selector: 'app-home',
  imports: [
    SmallCardComponent,
    DropdownMenuComponent,
    CoverCardComponent,
    ButtonModule,
    RecentlyPlayedComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
