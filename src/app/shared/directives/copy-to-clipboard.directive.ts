import { Directive, HostListener, inject, input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Directive({
  selector: '[appCopyToClipboard]',
  host: { style: 'cursor: pointer' },
})
export class CopyToClipboardDirective {
  readonly appCopyToClipboard = input<string>('');
  private readonly messageService = inject(MessageService);

  @HostListener('click')
  onClick(): void {
    const text = this.appCopyToClipboard();
    if (!text) return;
    void navigator.clipboard
      .writeText(text)
      .then(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Copied',
          detail: 'Text copied to clipboard',
          life: 2000,
        });
      })
      .catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to copy text',
          life: 2000,
        });
      });
  }
}
