import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoverCardComponent } from '@shared/components/cover-card/cover-card.component';

import { SmallCardComponent } from '@shared/components/small-card/small-card.component';
import { DropdownMenuComponent } from '@shared/components/dropdown/dropdown-menu.component';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [SmallCardComponent, DropdownMenuComponent, CoverCardComponent, ButtonModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  menuItems: MenuItem[] = [
    { label: 'Add to favorites', icon: 'pi pi-heart-fill' },
    { label: 'View artist', icon: 'pi pi-user-plus' },
    { label: 'Remove from recents', icon: 'pi pi-trash' },
  ];
}
