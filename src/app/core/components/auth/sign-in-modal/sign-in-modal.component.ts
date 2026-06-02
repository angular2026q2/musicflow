import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { BaseAuthModal } from '@core/components/auth/base-auth-modal';
import { AuthService } from '@core/services/auth.service';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { LucideDynamicIcon } from '@lucide/angular';

import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';
import { SubmitButtonComponent } from '@shared/components/submit-button/submit-button.component';

@Component({
  selector: 'app-sign-in-modal',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    LucideDynamicIcon,
    PasswordModule,
    FormFieldComponent,
    ControlButtonComponent,
    SubmitButtonComponent,
  ],
  templateUrl: './sign-in-modal.component.html',
  styleUrl: './sign-in-modal.component.scss',
  host: {
    '(click)': '$event.stopPropagation()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInModalComponent extends BaseAuthModal {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    persistent: [false],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    try {
      const { email, password, persistent } = this.form.getRawValue();
      await this.authService.signIn({ email, password }, persistent);
      this.modalService.close();
    } catch {
      this.showError('Sign in failed', 'Invalid email or password. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
