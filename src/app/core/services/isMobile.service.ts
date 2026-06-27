import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class isMobileService {
  private readonly mediaQuery = window.matchMedia('(max-width: 768px)');

  readonly isMobile = signal(this.mediaQuery.matches);

  constructor() {
    this.mediaQuery.addEventListener('change', ({ matches }) => {
      this.isMobile.set(matches);
    });
  }
}
