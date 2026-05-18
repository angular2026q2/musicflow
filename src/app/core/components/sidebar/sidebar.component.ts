import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { isActive, Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { type NavItem, NavItemComponent } from '@shared/components/nav-item/nav-item.component';
import { APP_ROUTES } from '@shared/constants/routes';
import { ICONS } from '@shared/constants/icons';

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
    { ...APP_ROUTES.HOME, icon: ICONS.house.icon },
    { ...APP_ROUTES.SEARCH, icon: ICONS.search.icon },
    { ...APP_ROUTES.LIBRARY, icon: ICONS.library.icon },
  ];

  readonly isSettingsPage = isActive(`/${APP_ROUTES.SETTINGS.route}`, this.router, {
    paths: 'exact',
    queryParams: 'exact',
    fragment: 'ignored',
    matrixParams: 'ignored',
  });

  readonly contextNavItems = computed<NavItem[]>(() => {
    if (this.isSettingsPage()) {
      return [{ ...APP_ROUTES.SETTINGS, icon: ICONS.settings.icon }];
    }
    return [];
  });
}
