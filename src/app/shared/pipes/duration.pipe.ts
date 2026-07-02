import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description Transforms duration in seconds to `mm:ss` or `Xh mm:ss` format
 * @example
 * 346 => 05:46
 * 3666 => 1:01:06
 * */
@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(seconds: number, format: 'track' | 'total' = 'track'): string {
    const invalid = !seconds || seconds < 0;

    if (format === 'total') {
      if (invalid) return '0 min';

      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      return h > 0 ? `${h}h ${m} min` : `${m} min`;
    }

    if (invalid) return '0:00';
    // * format === 'track' --> mm:ss
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const mm = m.toString().padStart(h > 0 ? 2 : 1, '0');
    const ss = s.toString().padStart(2, '0');
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  }
}
