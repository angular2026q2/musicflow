import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]',
  host: {
    '[type]': 'appPasswordToggle() ? "text" : "password"',
  },
})
export class PasswordToggleDirective {
  readonly appPasswordToggle = input<boolean>(false);
}
