import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '@core/services/auth.service';
import { ModalService } from '@core/services/modal.service';
import { MessageService } from 'primeng/api';

import { SignUpModalComponent } from '@core/components/auth/sign-up-modal/sign-up-modal.component';

describe('SignUpModalComponent', () => {
  let component: SignUpModalComponent;
  let fixture: ComponentFixture<SignUpModalComponent>;
  let authServiceMock: { signUp: ReturnType<typeof vi.fn> };
  let modalServiceMock: { close: ReturnType<typeof vi.fn>; switchTo: ReturnType<typeof vi.fn> };
  let messageServiceMock: { add: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authServiceMock = { signUp: vi.fn().mockResolvedValue(undefined) };
    modalServiceMock = { close: vi.fn(), switchTo: vi.fn() };
    messageServiceMock = { add: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [SignUpModalComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SignUp Modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should SignUp form be invalid on init', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should SignUp form be `true` having valid values', () => {
    component.form.setValue({
      full_name: 'John Smith',
      username: 'johnsmith',
      email: 'johnsmith@musicflow.com',
      password: 'Qwerty123',
    });
    expect(component.form.valid).toBe(true);
  });

  it('should SignUp form be `false` having invalid values', () => {
    component.form.setValue({
      full_name: 'Jo',
      username: 'Q',
      email: 'johnsmith@',
      password: '123',
    });
    expect(component.form.invalid).toBe(true);
  });

  it('should not authorize and signUp User when form is invalid', async () => {
    await component.onSubmit();
    expect(authServiceMock.signUp).not.toHaveBeenCalled();
  });

  it('should authorize and signUp User when form is valid', async () => {
    component.form.setValue({
      full_name: 'John Smith',
      username: 'johnsmith',
      email: 'johnsmith@musicflow.com',
      password: 'Qwerty123',
    });
    await component.onSubmit();
    expect(authServiceMock.signUp).toHaveBeenCalledWith({
      full_name: 'John Smith',
      username: 'johnsmith',
      email: 'johnsmith@musicflow.com',
      password: 'Qwerty123',
    });
  });

  it('should SignUp Modal component be closed when signUp was successful', async () => {
    component.form.setValue({
      full_name: 'John Smith',
      username: 'johnsmith',
      email: 'johnsmith@musicflow.com',
      password: 'Qwerty123',
    });
    await component.onSubmit();
    expect(modalServiceMock.close).toHaveBeenCalled();
  });

  it('should show error message when signUp fails', async () => {
    authServiceMock.signUp.mockRejectedValueOnce(new Error('Sign up failed'));
    component.form.setValue({
      full_name: 'John Smith',
      username: 'johnsmith',
      email: 'johnsmith@musicflow.com',
      password: 'Qwerty123',
    });
    await component.onSubmit();
    expect(messageServiceMock.add).toHaveBeenCalled();
  });

  it('should close SignUp Modal component', () => {
    component.close();
    expect(modalServiceMock.close).toHaveBeenCalled();
  });

  it('should switchTo SignIn Modal', () => {
    component.switchTo('sign-in');
    expect(modalServiceMock.switchTo).toHaveBeenCalledWith('sign-in');
  });
});
