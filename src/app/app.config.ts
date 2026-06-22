import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { provideLucideConfig } from '@lucide/angular';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { MusicFlowPreset } from '@styles/musicFlowPreset';
import { API_CONFIG, apiConfig, BUILD_URL, BuildUrl } from './api.tokens';
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
    MessageService,
    provideLucideConfig({ size: 20 }),
    { provide: API_CONFIG, useValue: apiConfig },
    {
      provide: BUILD_URL,
      useFactory: (): BuildUrl => {
        const config = inject(API_CONFIG);

        return (path: string) => [config.baseUrl, path].join('/');
      },
    },
  ],
};
