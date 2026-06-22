import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[appAutofocus]' })
export class AutofocusDirective {
  constructor() {
    const el = inject(ElementRef<HTMLInputElement>);
    afterNextRender(() => {
      const target = el.nativeElement.querySelector('input') ?? el.nativeElement;
      target.focus();
    });
  }
}
