import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { LucideHouse, LucideSearch, LucideLibraryBig, LucideSettings } from '@lucide/angular';
import { type NavItem, NavItemComponent } from '@shared/components/nav-item/nav-item.component';

@Component({
  selector: 'app-sidebar',
  imports: [NavItemComponent, DividerModule, TitleCasePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly router = inject(Router);
  readonly title = 'music flow';
  readonly subtitle = 'free music';

  readonly icons = { LucideHouse, LucideSearch, LucideLibraryBig, LucideSettings };

  readonly mainNavItems: NavItem[] = [
    { label: 'Home', route: '/', icon: LucideHouse },
    { label: 'Search', route: '/search', icon: LucideSearch },
    { label: 'Library', route: '/library', icon: LucideLibraryBig },
  ];

  readonly isSettingsPage = computed<boolean>(() => this.router.url === '/settings');

  readonly contextNavItems = computed<NavItem[]>(() => {
    if (this.isSettingsPage()) {
      return [{ label: 'Settings', route: '/settings', icon: LucideSettings }];
    }
    return [];
  });
}
