import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms large play count numbers to abbreviated format.
 * @example
 * 1234567 → '1.2M'
 * 12345 → '12.3K'
 * 999 → '999'
 */
@Pipe({
  name: 'playCount',
})
export class PlayCountPipe implements PipeTransform {
  transform(count: number): string {
    if (!count || count < 0) return '0';
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count.toString();
  }
}
