import { Directive, input } from '@angular/core';

/** todo: убрать из constructor уааусе() - Angular сам отслеживает сигнал через реактивный рендеринг. никакого effect(), никакого
 *  ElementRef. Всё плучается ччище и  современнее.*/
@Directive({
  selector: '[appPasswordToggle]',
  host: {
    '[type]': 'appPasswordToggle() ? "text" : "password"',
  },
})
export class PasswordToggleDirective {
  readonly appPasswordToggle = input<boolean>(false);
}
