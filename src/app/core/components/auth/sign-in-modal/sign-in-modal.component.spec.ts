import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { AuthService } from '@core/services/auth.service';
import { ModalService } from '@core/services/modal.service';
import { SignInModalComponent } from './sign-in-modal.component';

describe('SignInModalComponent', () => {
  let component: SignInModalComponent;
  let fixture: ComponentFixture<SignInModalComponent>;
  let authServiceMock: { signIn: ReturnType<typeof vi.fn> };
  let modalServiceMock: { close: ReturnType<typeof vi.fn>; switchTo: ReturnType<typeof vi.fn> };
  let messageServiceMock: { add: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authServiceMock = { signIn: vi.fn().mockResolvedValue(undefined) };
    modalServiceMock = { close: vi.fn(), switchTo: vi.fn() };
    messageServiceMock = { add: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [SignInModalComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form on init', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should have valid form with valid values', () => {
    component.form.setValue({
      identifier: 'john',
      password: 'qwerty123',
      persistent: false,
    });
    expect(component.form.valid).toBe(true);
  });

  it('should be invalid when password is shorter than 6 characters', () => {
    component.form.setValue({
      identifier: 'john',
      password: 'Qwe',
      persistent: false,
    });
    expect(component.form.invalid).toBe(true);
  });

  it('should not authorize User when form is invalid', async () => {
    await component.onSubmit();
    expect(authServiceMock.signIn).not.toHaveBeenCalled();
  });

  it('should authorize User when form is valid', async () => {
    component.form.setValue({
      identifier: 'john',
      password: 'qwerty123',
      persistent: false,
    });
    await component.onSubmit();
    expect(authServiceMock.signIn).toHaveBeenCalledWith(
      { identifier: 'john', password: 'qwerty123' },
      false,
    );
  });

  it('should close modal window when signIn was successful', async () => {
    component.form.setValue({
      identifier: 'john',
      password: 'qwerty123',
      persistent: false,
    });
    await component.onSubmit();
    expect(modalServiceMock.close).toHaveBeenCalled();
  });

  it('should show error message when signIn fails', async () => {
    authServiceMock.signIn.mockRejectedValueOnce(new Error('Invalid credentials'));
    component.form.setValue({
      identifier: 'john',
      password: 'qwerty123',
      persistent: false,
    });
    await component.onSubmit();
    expect(messageServiceMock.add).toHaveBeenCalled();
  });

  it('should close modal', () => {
    component.close();
    expect(modalServiceMock.close).toHaveBeenCalled();
  });

  it('should switchTo other Modal', () => {
    component.switchTo('sign-up');
    expect(modalServiceMock.switchTo).toHaveBeenCalledWith('sign-up');
  });
});
