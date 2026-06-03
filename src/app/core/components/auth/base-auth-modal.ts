import { inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ModalService, type ModalType } from '@core/services/modal.service';
import { ICONS } from '@shared/constants/icons';

export abstract class BaseAuthModal {
  protected readonly modalService = inject(ModalService);
  protected readonly messageService = inject(MessageService);

  readonly isLoading = signal<boolean>(false);
  readonly ICONS = ICONS;

  close(): void {
    this.modalService.close();
  }

  switchTo(modal: ModalType): void {
    this.modalService.switchTo(modal);
  }

  protected showError(summary: string, detail: string, life = 4000): void {
    this.messageService.add({ severity: 'error', summary, detail, life });
  }

  protected showSuccess(summary: string, detail: string, life = 6000): void {
    this.messageService.add({ severity: 'success', summary, detail, life });
  }
}
