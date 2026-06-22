import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]',
  host: {
    '[attr.type]': 'appPasswordToggle() ? "text" : "password"',
  },
})
export class PasswordToggleDirective {
  readonly appPasswordToggle = input<boolean>(false);
}
