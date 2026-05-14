import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { LucideHouse, LucideSearch, LucideLibraryBig, LucideSettings } from '@lucide/angular';
import { type NavItem, NavItemComponent } from '@shared/components/nav-item/nav-item.component';
import { APP_ROUTES } from '@shared/constants/routes';

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

  readonly mainNavItems: NavItem[] = [
    { ...APP_ROUTES.HOME, icon: LucideHouse },
    { ...APP_ROUTES.SEARCH, icon: LucideSearch },
    { ...APP_ROUTES.LIBRARY, icon: LucideLibraryBig },
  ];

  readonly isSettingsPage = computed<boolean>(() =>
    this.router.url.includes(APP_ROUTES.SETTINGS.route),
  );

  readonly contextNavItems = computed<NavItem[]>(() => {
    if (this.isSettingsPage()) {
      return [{ ...APP_ROUTES.SETTINGS, icon: LucideSettings }];
    }
    return [];
  });
}
