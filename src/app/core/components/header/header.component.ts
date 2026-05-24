import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { APP_ROUTES } from '@shared/constants/routes';
import { ICONS } from '@shared/constants/icons';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';
import { UserAvatarComponent } from '@shared/components/user-avatar/user-avatar.component';

/**
 * todo: задача на Sprint 2 - заменить avatarUrl `input()` иньекцией сервиса `UserService` injection.
 * `UserService` должен передавать сигнал с прифилем текущего пользователя (`avatar_url`).
 * Типа так:
 *   private readonly userService = inject(UserService);
 *   readonly avatarUrl = computed(() => this.userService.profile()?.avatar_url ?? '');
 * Нужно будет удалить `avatarUrl input()` после того, как написал и добавил `UserService`.
 */
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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  /** задача на Sprint 2 - заменить `input()` на `UserService` тут: */
  readonly avatarUrl = input<string>('');

  protected readonly APP_ROUTES = APP_ROUTES;
  protected readonly ICONS = ICONS;
  protected readonly profileLink = `/${APP_ROUTES.PROFILE.route}`;
}
