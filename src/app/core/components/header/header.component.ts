import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { APP_ROUTES } from '@shared/constants/routes';
import { ICONS } from '@shared/constants/icons';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';
import { UserAvatarComponent } from '@shared/components/user-avatar/user-avatar.component';
import { SearchQueryService } from '@core/services/search-query-service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    LucideDynamicIcon,
    ControlButtonComponent,
    UserAvatarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  protected readonly APP_ROUTES = APP_ROUTES;
  protected readonly ICONS = ICONS;

  searchControl = new FormControl('');
  private readonly searchQueryService = inject(SearchQueryService);

  ngOnInit() {
    this.searchQueryService.query$.subscribe((value) => {
      this.searchControl.setValue(value, { emitEvent: false });
    });

    this.searchControl.valueChanges.subscribe((value) => {
      this.searchQueryService.setQuery(value ?? '');
    });
  }

  // ngOnInit() {
  //   this.syncSearchControlWithUrl();
  //   this.initSearchListener();
  // }

  // private syncSearchControlWithUrl() {
  //   this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
  //     const query = this.router.parseUrl(this.router.url).queryParams['q'];

  //     if (query !== this.searchControl.value) {
  //       this.searchControl.setValue(query ?? '', {
  //         emitEvent: false,
  //       });
  //     }
  //   });
  // }

  // private initSearchListener() {
  //   this.searchControl.valueChanges
  //     .pipe(debounceTime(400), distinctUntilChanged())
  //     .subscribe((value) => {
  //       const query = value?.trim();

  //       if (!query) {
  //         this.router.navigate([APP_ROUTES.SEARCH.route], {
  //           replaceUrl: true,
  //         });

  //         return;
  //       }

  //       this.router.navigate([APP_ROUTES.SEARCH.route], {
  //         queryParams: { q: query },
  //         replaceUrl: true,
  //       });
  //     });
  // }

  // onSearchSubmit() {
  //   const query = this.searchControl.value;
  //   if (query) {
  //     this.router.navigate([APP_ROUTES.SEARCH.route], {
  //       queryParams: { q: query },
  //     });
  //     this.searchControl.setValue('');
  //   }
  // }
}
