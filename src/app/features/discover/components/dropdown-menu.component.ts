import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-recently-played-menu',
  template: `
    <div>
      <p-menu
        #menu
        [model]="items"
        [popup]="true"
        [appendTo]="'body'"
        styleClass="recentlyPlayed-menu"
      />
      <p-button
        (click)="menu.toggle($event)"
        icon="pi pi-ellipsis-h"
        [text]="true"
        styleClass="recentlyPlayed-menu-button"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        width: auto;
      }
    `,
  ],
  standalone: true,
  imports: [ButtonModule, MenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyPlayedMenuPopup implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Add to favorites',
        icon: 'pi pi-heart-fill',
      },
      {
        label: 'View artist',
        icon: 'pi pi-user-plus',
      },
      {
        label: 'Remove from recents',
        icon: 'pi pi-trash',
      },
    ];
  }
}
