import { Injectable, signal } from '@angular/core';

export type ModalType = 'sign-in' | 'sign-up' | 'forgot-password' | 'reset-password' | null;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly _activeModal = signal<ModalType | null>(null);

  readonly activeModal = this._activeModal.asReadonly();

  open(modal: ModalType): void {
    this._activeModal.set(modal);
  }

  close(): void {
    this._activeModal.set(null);
  }

  switchTo(modal: ModalType): void {
    this._activeModal.set(modal);
  }
}
