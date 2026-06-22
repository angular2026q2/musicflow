import { InjectionToken } from '@angular/core';

export interface StreamingQuality {
  label: string;
  value: string;
}

export const STREAMING_QUALITY_OPTIONS = new InjectionToken<StreamingQuality[]>(
  'STREAMING_QUALITY_OPTIONS',
  {
    providedIn: 'root',
    factory: () => [
      { label: 'Lossless (Hi-Res)', value: 'lossless' },
      { label: 'High (320kbps)', value: 'high' },
      { label: 'Medium (160kbps)', value: 'medium' },
      { label: 'Low (96kbps)', value: 'low' },
    ],
  },
);
