import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { isActive, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { type NavItem, NavItemComponent } from '@shared/components/nav-item/nav-item.component';
import { ICONS } from '@shared/constants/icons';
import { APP_ROUTES } from '@shared/constants/routes';

@Component({
  selector: 'app-sidebar',
  imports: [NavItemComponent, DividerModule, TitleCasePipe, RouterLink, RouterLinkActive],
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
    { ...APP_ROUTES.LIBRARY, icon: ICONS.playlist.icon },
  ];

  private readonly contextNavRegistry: { item: NavItem; isActive: Signal<boolean> }[] = (
    [
      { ...APP_ROUTES.SETTINGS, icon: ICONS.settings.icon },
      { ...APP_ROUTES.PROFILE, icon: ICONS.user.icon },
    ] as NavItem[]
  ).map((item) => ({
    item,
    isActive: isActive(`/${item.route}`, this.router, {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    }),
  }));
  readonly aboutTeamNavItem = APP_ROUTES.ABOUT;

  readonly contextNavItems = computed<NavItem[]>(() => {
    const active = this.contextNavRegistry.find(({ isActive }) => isActive());
    return active ? [active.item] : [];
  });
}
