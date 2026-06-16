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
}
