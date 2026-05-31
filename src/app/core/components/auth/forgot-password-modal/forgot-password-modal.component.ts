import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { BaseAuthModal } from '@core/components/auth/base-auth-modal';
import { AuthService } from '@core/services/auth.service';

import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { SubmitButtonComponent } from '@shared/components/submit-button/submit-button.component';

@Component({
  selector: 'app-forgot-password-modal',
  imports: [ReactiveFormsModule, ControlButtonComponent, FormFieldComponent, SubmitButtonComponent],
  templateUrl: './forgot-password-modal.component.html',
  styleUrl: './forgot-password-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': '$event.stopPropagation()',
  },
})
export class ForgotPasswordModalComponent extends BaseAuthModal {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    try {
      await this.authService.resetPassword(this.form.getRawValue().email);
      this.showSuccess('Email sent', 'Check your email for password reset instructions.');
      this.modalService.close();
    } catch {
      this.showError('Reset failed', 'No account found with provided email.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
