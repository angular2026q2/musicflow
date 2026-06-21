import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { APP_ROUTES } from '@shared/constants/routes';

export const libraryGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.hasToken() || router.createUrlTree([`/${APP_ROUTES.HOME.route}`]);
};
