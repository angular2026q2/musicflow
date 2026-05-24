import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideLucideConfig } from '@lucide/angular';
import { providePrimeNG } from 'primeng/config';
import { authInterceptor } from '@core/interceptors/auth.interceptor';

import { MusicFlowPreset } from '@styles/musicFlowPreset';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    providePrimeNG({
      theme: {
        preset: MusicFlowPreset,
      },
    }),
    provideLucideConfig({ size: 20 }),
  ],
};
