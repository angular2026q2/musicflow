import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-user-avatar',
  imports: [RouterLink, AvatarModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  readonly avatarUrl = input<string>('');
  readonly link = input<string | null>(null);
  readonly ariaLabel = input<string>('User avatar');
  readonly icon = input<string>('pi pi-user');
  readonly size = input<'normal' | 'large' | 'xlarge'>('normal');
}
