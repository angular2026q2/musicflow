import { Routes } from '@angular/router';
import { APP_ROUTES } from '@shared/constants/routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: APP_ROUTES.SEARCH.route,
    loadComponent: () => import('@features/search/search.page').then((m) => m.SearchPage),
  },
  {
    path: APP_ROUTES.LIBRARY.route,
    loadComponent: () => import('@features/library/library.page').then((m) => m.LibraryPage),
  },
  {
    path: APP_ROUTES.SETTINGS.route,
    loadComponent: () => import('@features/settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: APP_ROUTES.PROFILE.route,
    loadComponent: () => import('@features/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: APP_ROUTES.DISCOVER.route,
    loadComponent: () => import('@features/discover/discover.page').then((m) => m.DiscoverPage),
  },
  {
    path: '**',
    loadComponent: () => import('@features/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
