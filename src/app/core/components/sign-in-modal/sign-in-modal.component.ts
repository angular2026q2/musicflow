import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '@core/services/auth.service';
import { ModalService } from '@core/services/modal.service';
import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinner } from 'primeng/progressspinner';
import { LucideDynamicIcon } from '@lucide/angular';

import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';

import { ICONS } from '@shared/constants/icons';

@Component({
  selector: 'app-sign-in-modal',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    LucideDynamicIcon,
    PasswordModule,
    ProgressSpinner,
    FormFieldComponent,
    ControlButtonComponent,
  ],
  templateUrl: './sign-in-modal.component.html',
  styleUrl: './sign-in-modal.component.scss',
  host: {
    '(click)': '$event.stopPropagation()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInModalComponent {
  private readonly authService = inject(AuthService);
  private readonly modalService = inject(ModalService);
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);

  readonly isLoading = signal<boolean>(false);
  readonly ICONS = ICONS;

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
      this.messageService.add({
        severity: 'error',
        summary: 'Sign in failed',
        detail: 'Invalid email or password. Please try again.',
        life: 4000,
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  switchToSignUp(): void {
    this.modalService.switchTo('sign-up');
  }

  switchToForgotPassword(): void {
    this.modalService.switchTo('forgot-password');
  }

  close(): void {
    this.modalService.close();
  }
}
