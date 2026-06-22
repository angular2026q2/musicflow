import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { passwordsMatch } from '@shared/validators/passwords-match.validator';

import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { PasswordModule } from 'primeng/password';
import { LucideDynamicIcon } from '@lucide/angular';
import { ICONS } from '@shared/constants/icons';

import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { SubmitButtonComponent } from '@shared/components/submit-button/submit-button.component';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    AvatarModule,
    PasswordModule,
    LucideDynamicIcon,
    FormFieldComponent,
    SubmitButtonComponent,
  ],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly currentUser = this.authService.currentUser;
  readonly ICONS = ICONS;

  readonly avatarUploading = signal<boolean>(false);
  readonly showDeleteConfirm = signal<boolean>(false);

  readonly profileForm = this.fb.nonNullable.group({
    username: [this.currentUser()?.username ?? ''],
    full_name: [this.currentUser()?.full_name ?? ''],
  });

  readonly passwordForm = this.fb.nonNullable.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatch('newPassword', 'confirmPassword') },
  );

  onSaveProfile(): void {
    const { username, full_name } = this.profileForm.getRawValue();
    this.userService.updateProfile({ username, full_name }).subscribe({
      next: () => {
        this.authService.updateCurrentUser({ username, full_name });
        this.messageService.add({
          severity: 'success',
          summary: 'Saved',
          detail: 'Profile updated.',
          life: 3000,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not save profile. Try again later.',
          life: 4000,
        });
      },
    });
  }

  onUpdatePassword(): void {
    if (this.passwordForm.invalid) return;
    const email = this.currentUser()?.email;
    if (!email) return;

    void this.authService
      .resetPassword(email)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Check your email',
          detail: 'A password reset link has been sent to your address.',
          life: 5000,
        });
        this.passwordForm.reset();
      })
      .catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not send reset link. Try again.',
          life: 4000,
        });
      });
  }

  onAvatarChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.avatarUploading.set(true);
    this.userService.uploadAvatar(file).subscribe({
      next: (profile) => {
        this.authService.updateCurrentUser({ avatar_url: profile.avatar_url });
        this.avatarUploading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Upload failed',
          detail: 'Could not upload avatar. Please try again.',
          life: 4000,
        });
        this.avatarUploading.set(false);
      },
    });
  }

  onDeleteAvatar(): void {
    this.userService.deleteAvatar().subscribe({
      next: (profile) => {
        this.authService.updateCurrentUser({ avatar_url: profile.avatar_url });
      },
    });
  }

  onLogout(): void {
    this.authService.signOut();
    void this.router.navigate(['/']);
  }

  onDeleteAccount(): void {
    this.userService.deleteAccount().subscribe({
      next: () => {
        this.authService.signOut();
        void this.router.navigate(['/']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not delete account. Try again later.',
          life: 4000,
        });
      },
    });
  }
}
