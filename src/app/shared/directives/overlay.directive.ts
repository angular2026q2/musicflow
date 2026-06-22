import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appOverlay]',
  standalone: true,
  host: {
    style: `
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
      z-index:2;
      opacity:0;
      
    `,
  },
})
export class OverlayDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  constructor() {
    const host = this.elementRef.nativeElement;
    const hoverContainer = host.parentElement;

    hoverContainer?.style.setProperty('position', 'relative');

    hoverContainer?.addEventListener('mouseenter', () => {
      host.style.opacity = '1';
      host.style.cursor = 'pointer';
    });

    hoverContainer?.addEventListener('mouseleave', () => {
      host.style.opacity = '0';
      host.style.boxShadow = '';
    });
  }
}
