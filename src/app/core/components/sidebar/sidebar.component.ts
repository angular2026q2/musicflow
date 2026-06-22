import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { isActive, Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { type NavItem, NavItemComponent } from '@shared/components/nav-item/nav-item.component';
import { ICONS } from '@shared/constants/icons';
import { APP_ROUTES } from '@shared/constants/routes';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-sidebar',
  imports: [NavItemComponent, DividerModule, TitleCasePipe, NgOptimizedImage],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly router = inject(Router);
  readonly auth = inject(AuthService);

  readonly title = 'music flow';
  readonly subtitle = 'free music';

  readonly playerNavItem: NavItem = {
    route: 'player',
    label: 'Player',
    icon: ICONS.play.icon,
  };

  readonly mainNavItems: NavItem[] = [
    { ...APP_ROUTES.HOME, icon: ICONS.house.icon },
    { ...APP_ROUTES.SEARCH, icon: ICONS.search.icon },
    { ...APP_ROUTES.ALBUMS, icon: ICONS.albums.icon },
    { ...APP_ROUTES.ARTISTS, icon: ICONS.artists.icon },
  ];

  readonly libraryNavItem: NavItem = { ...APP_ROUTES.LIBRARY, icon: ICONS.library.icon };

  readonly aboutNavItem: NavItem = { ...APP_ROUTES.ABOUT, icon: ICONS.info.icon };

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

  readonly contextNavItems = computed<NavItem[]>(() => {
    const active = this.contextNavRegistry.find(({ isActive }) => isActive());
    return active ? [active.item] : [];
  });
}
