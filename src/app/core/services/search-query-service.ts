import { Injectable, effect, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { APP_ROUTES } from '@shared/constants/routes';

@Injectable({
  providedIn: 'root',
})
export class SearchQueryService {
  private readonly router = inject(Router);
  readonly query = signal('');

  private readonly navigationEnd = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    {
      initialValue: this.router.url,
    },
  );

  constructor() {
    effect(() => {
      const url = this.navigationEnd();
      if (!url.startsWith(`/${APP_ROUTES.SEARCH.route}`)) {
        this.query.set('');
        return;
      }

      const q = this.router.parseUrl(url).queryParams['q'] ?? '';
      this.query.set(q);
    });

    effect(() => {
      const query = this.query().trim();

      const isSearchPage = this.router.url.startsWith(`/${APP_ROUTES.SEARCH.route}`);

      if (!query && !isSearchPage) {
        return;
      }

      if (!query) {
        this.router.navigate([APP_ROUTES.SEARCH.route], {
          replaceUrl: true,
        });

        return;
      }

      this.router.navigate([APP_ROUTES.SEARCH.route], {
        queryParams: {
          q: query,
        },
        replaceUrl: true,
      });
    });
  }

  setQuery(query: string) {
    this.query.set(query ?? '');
  }
}
