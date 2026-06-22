import { InjectionToken } from '@angular/core';
import { ApiConfig } from '@shared/interfaces/apiconfig';

export const apiConfig: ApiConfig = {
  baseUrl: '/api/v1',
  path: {
    history: 'history',
    playlists: 'playlists',
  },
};

export type BuildUrl = (path: string) => string;
export const BUILD_URL = new InjectionToken<BuildUrl>('BUILD_URL');
export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');
