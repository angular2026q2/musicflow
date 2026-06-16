import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { APP_ROUTES } from '@shared/constants/routes';

@Injectable({ providedIn: 'root' })
export class SearchQueryService {
  private readonly router = inject(Router);
  private readonly querySubject = new BehaviorSubject<string>('');

  readonly query$ = this.querySubject.asObservable();

  constructor() {
    this.initUrlSync();
    this.initNavigation();
  }

  setQuery(query: string) {
    this.querySubject.next(query ?? '');
  }

  private initUrlSync() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((event) => {
      const url = (event as NavigationEnd).urlAfterRedirects;

      if (!url.startsWith(`/${APP_ROUTES.SEARCH.route}`)) {
        this.querySubject.next('');
        return;
      }

      const q = this.router.parseUrl(url).queryParams['q'] ?? '';

      this.querySubject.next(q);
    });
  }

  private initNavigation() {
    this.query$.pipe(debounceTime(400), distinctUntilChanged()).subscribe((query) => {
      const q = query.trim();

      if (!q && !this.router.url.startsWith(`/${APP_ROUTES.SEARCH.route}`)) {
        return;
      }

      if (!q) {
        this.router.navigate([APP_ROUTES.SEARCH.route], {
          replaceUrl: true,
        });
        return;
      }

      this.router.navigate([APP_ROUTES.SEARCH.route], {
        queryParams: { q },
        replaceUrl: true,
      });
    });
  }
}
