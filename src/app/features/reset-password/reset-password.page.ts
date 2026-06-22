import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { LucideDynamicIcon } from '@lucide/angular';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { ModalService } from '@core/services/modal.service';

import { SubmitButtonComponent } from '@shared/components/submit-button/submit-button.component';
import { ICONS } from '@shared/constants/icons';

@Component({
  selector: 'app-reset-password',
  imports: [LucideDynamicIcon, PasswordModule, ReactiveFormsModule, SubmitButtonComponent],
  templateUrl: './reset-password.page.html',
  styleUrl: './reset-password.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPage implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly ICONS = ICONS;

  readonly isLoading = signal<boolean>(false);
  readonly token = signal<string | null>(null);
  readonly refreshToken = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: (group) => {
        const password = group.get('password')?.value;
        const confirm = group.get('confirmPassword')?.value;
        return password === confirm ? null : { passwordMismatch: true };
      },
    },
  );

  ngOnInit(): void {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const type = params.get('type');

    if (!accessToken || !refreshToken || type !== 'recovery') {
      void this.router.navigate(['/']);
      return;
    }

    this.token.set(accessToken);
    this.refreshToken.set(refreshToken);

    //* сначала извлекаю из URL оба токена и сохраняю в сигналы, только потом вызываю replaceState:
    window.history.replaceState({}, '', '/reset-password');
  }

  /** @description Handles form submission.
   * - on success password reset - shows a success message and suggests sign-in using New Password
   * - on failure - shows an error message and suggests sign-in modal */
  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const { password, confirmPassword } = this.form.getRawValue();

    if (password !== confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Passwords do not match',
        detail: 'Please make sure both passwords are the same.',
        life: 4000,
      });
      return;
    }

    const token = this.token();
    const refreshToken = this.refreshToken();
    if (!token || !refreshToken) return;

    this.isLoading.set(true);
    try {
      await this.authService.confirmPasswordReset(token, refreshToken, password);
      this.messageService.add({
        severity: 'success',
        summary: 'Password updated',
        detail: 'Your password has been changed. Please sign in.',
        life: 5000,
      });
      this.modalService.open('sign-in');
      void this.router.navigate(['/']);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Reset failed',
        detail: 'Link may have expired. Please request a new one.',
        life: 4000,
      });
      this.modalService.open('sign-in');
      void this.router.navigate(['/']);
    } finally {
      this.isLoading.set(false);
    }
  }
}
