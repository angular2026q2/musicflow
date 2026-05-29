import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { LucideDynamicIcon, LucideIcon } from '@lucide/angular';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import type { FormFieldType } from '@shared/interfaces/form-field.interface';

@Component({
  selector: 'app-form-field',
  imports: [
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    LucideDynamicIcon,
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  readonly label = input.required<string>();
  readonly inputId = input.required<string>();
  readonly icon = input.required<LucideIcon>();
  readonly type = input<FormFieldType>('text');
  readonly placeholder = input<string>('');
  readonly autocomplete = input<string>('off');
  readonly control = input.required<AbstractControl>();
  readonly errorMessage = input<string>('');
}
