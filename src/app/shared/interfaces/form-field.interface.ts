import { FormControl } from '@angular/forms';

export type FormFieldType = 'text' | 'email' | 'password'; // можно дописать типы полей, если потом появятся ещё

export interface FormFieldErrorMap {
  required?: string;
  email?: string;
  minlength?: string;
}

export interface FormFieldConfig<T> {
  control: FormControl<T>;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  icon?: string;
  autocomplete?: string;
  showToggle?: boolean;
  showError?: boolean;
  errorMap?: FormFieldErrorMap;
}
