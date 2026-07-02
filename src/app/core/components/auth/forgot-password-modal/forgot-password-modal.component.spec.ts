import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '@core/services/auth.service';
import { ModalService } from '@core/services/modal.service';
import { MessageService } from 'primeng/api';

import { ForgotPasswordModalComponent } from '@core/components/auth/forgot-password-modal/forgot-password-modal.component';

describe('ForgotPasswordModalComponent', () => {
  let component: ForgotPasswordModalComponent;
  let fixture: ComponentFixture<ForgotPasswordModalComponent>;
  let authServiceMock: { resetPassword: ReturnType<typeof vi.fn> };
  let modalServiceMock: { close: ReturnType<typeof vi.fn> };
  let messageServiceMock: { add: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authServiceMock = { resetPassword: vi.fn().mockResolvedValue(undefined) };
    modalServiceMock = { close: vi.fn() };
    messageServiceMock = { add: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ForgotPasswordModalComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ForgotPassword Modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should ForgotPassword form be invalid in init', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should submit form with valid email', async () => {
    const email = 'johnsmith@musicflow.com';
    component.form.setValue({ email });
    await component.onSubmit();
    expect(authServiceMock.resetPassword).toHaveBeenCalledWith(email);
  });

  it('should show error message when form submit failed', async () => {
    authServiceMock.resetPassword.mockRejectedValueOnce(new Error('Reset failed'));
    component.form.setValue({
      email: 'johnsmith_not_found@musicflow.com',
    });
    await component.onSubmit();
    expect(messageServiceMock.add).toHaveBeenCalled();
  });

  it('should show success message when form submit was successful', async () => {
    const email = 'johnsmith@musicflow.com';
    component.form.setValue({ email });
    await component.onSubmit();
    expect(messageServiceMock.add).toHaveBeenCalled();
  });
});
