import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '@shared/constants/routes';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { LucideBell, LucideSettings } from '@lucide/angular';

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
    AvatarModule,
    ButtonModule,
    LucideBell,
    LucideSettings,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  /** задача на Sprint 2 - заменить `input()` на `UserService` тут: */
  readonly avatarUrl = input<string>('');
  protected readonly APP_ROUTES = APP_ROUTES;
}
