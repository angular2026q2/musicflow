import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ModalService } from '@core/services/modal.service';
import { APP_ROUTES } from '@shared/constants/routes';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-user-avatar',
  imports: [RouterLink, AvatarModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
  host: {
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  private readonly authService = inject(AuthService);
  private readonly modalService = inject(ModalService);

  readonly ariaLabel = input<string>('User avatar');
  readonly icon = input<string>('pi pi-user');
  readonly size = input<'normal' | 'large' | 'xlarge'>('normal');

  readonly isGuest = this.authService.isGuest;

  readonly avatarUrl = computed(() => this.authService.currentUser()?.avatar_url ?? '');

  readonly link = computed(() =>
    this.authService.isAuthenticated() ? `/${APP_ROUTES.PROFILE.route}` : null,
  );

  onClick(): void {
    if (this.authService.isGuest()) {
      this.modalService.open('sign-in');
    }
  }
}
