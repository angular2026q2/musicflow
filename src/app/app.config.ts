import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  LucideBell,
  LucideSettings,
  provideLucideConfig,
  provideLucideIcons,
} from '@lucide/angular';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideLucideIcons(LucideBell, LucideSettings),
    provideLucideConfig({ size: 20 }),
  ],
};
