import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { BaseAuthModal } from '@core/components/auth/base-auth-modal';
import { AuthService } from '@core/services/auth.service';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { LucideDynamicIcon } from '@lucide/angular';

import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';
import { SubmitButtonComponent } from '@shared/components/submit-button/submit-button.component';

@Component({
  selector: 'app-sign-up-modal',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    LucideDynamicIcon,
    FormFieldComponent,
    ControlButtonComponent,
    SubmitButtonComponent,
  ],
  templateUrl: './sign-up-modal.component.html',
  styleUrl: './sign-up-modal.component.scss',
  host: {
    '(click)': '$event.stopPropagation()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpModalComponent extends BaseAuthModal {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    full_name: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    try {
      const { full_name, username, email, password } = this.form.getRawValue();

      await this.authService.signUp({
        full_name,
        username,
        email,
        password,
      });
      this.modalService.close();
    } catch {
      this.showError('Sign up failed', 'An error occurred during sign up. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
