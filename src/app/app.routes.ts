import { Routes } from '@angular/router';
import { libraryGuard } from '@core/guards/library.guard';
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
    canActivate: [libraryGuard],
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
    path: APP_ROUTES.ALBUMS.route,
    loadComponent: () => import('@features/albums/albums.page').then((m) => m.AlbumsPage),
  },
  {
    path: APP_ROUTES.ALBUM.route,
    loadComponent: () => import('@features/album/album.page').then((m) => m.AlbumPage),
  },
  {
    path: APP_ROUTES.ARTIST.route,
    loadComponent: () => import('@features/artist/artist.page').then((m) => m.ArtistPage),
  },
  {
    path: APP_ROUTES.ARTISTS.route,
    loadComponent: () => import('@features/artists/artists.page').then((m) => m.ArtistsPage),
  },
  {
    path: APP_ROUTES.ABOUT.route,
    loadComponent: () => import('@features/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: APP_ROUTES.RESET_PASSWORD.route,
    loadComponent: () =>
      import('@features/reset-password/reset-password.page').then((m) => m.ResetPasswordPage),
  },
  {
    path: '**',
    loadComponent: () => import('@features/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
