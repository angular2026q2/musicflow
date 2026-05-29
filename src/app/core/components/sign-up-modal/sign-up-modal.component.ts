import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '@core/services/auth.service';
import { ModalService } from '@core/services/modal.service';
import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinner } from 'primeng/progressspinner';
import { LucideDynamicIcon } from '@lucide/angular';

import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { ControlButtonComponent } from '@shared/components/control-button/control-button.component';

import { ICONS } from '@shared/constants/icons';

@Component({
  selector: 'app-sign-up-modal',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    LucideDynamicIcon,
    ProgressSpinner,
    FormFieldComponent,
    ControlButtonComponent,
  ],
  templateUrl: './sign-up-modal.component.html',
  styleUrl: './sign-up-modal.component.scss',
  host: {
    '(click)': '$event.stopPropagation()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpModalComponent {
  private readonly authService = inject(AuthService);
  private readonly modalService = inject(ModalService);
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);

  readonly isLoading = signal<boolean>(false);
  readonly ICONS = ICONS;

  readonly form = this.fb.group({
    full_name: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    this.isLoading.set(true);

    try {
      const { full_name, username, email, password } = this.form.getRawValue() as {
        full_name: string;
        username: string;
        email: string;
        password: string;
      };

      await this.authService.signUp({
        full_name,
        username,
        email,
        password,
      });
      this.modalService.close();
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Sign up failed',
        detail: 'An error occurred during sign up. Please try again.',
        life: 4000,
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  switchToSignIn(): void {
    this.modalService.switchTo('sign-in');
  }

  close(): void {
    this.modalService.close();
  }
}
