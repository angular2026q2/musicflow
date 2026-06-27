import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { environment } from '@environments/environment';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

import type { SignUpDto } from './dto/auth.dto';
import type { AuthUser } from '@shared/interfaces/auth-user.interface';

const flushMicrotasks = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

interface TokenServiceMock {
  save: ReturnType<typeof vi.fn>;
  get: ReturnType<typeof vi.fn>;
  clear: ReturnType<typeof vi.fn>;
  exists: ReturnType<typeof vi.fn>;
}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let tokenServiceMock: TokenServiceMock;

  const mockUser: AuthUser = {
    id: 'user-1',
    email: 'test@example.com',
    username: 'testuser',
    full_name: 'Test User',
    avatar_url: null,
  };

  function setup(hasToken = false): void {
    tokenServiceMock = {
      save: vi.fn(),
      get: vi.fn(),
      clear: vi.fn(),
      exists: vi.fn().mockReturnValue(hasToken),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TokenService, useValue: tokenServiceMock },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  }

  beforeEach(() => {
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    httpMock?.verify();
  });

  describe('initialization', () => {
    it('should be created', () => {
      setup();
      expect(service).toBeTruthy();
    });

    it('should start as guest when no token exists', () => {
      setup(false);
      expect(service.currentUser()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
      expect(service.isGuest()).toBe(true);
    });

    it('should load current user on construction when token exists', async () => {
      setup(true);
      const req = httpMock.expectOne(`${environment.apiUrl}/v1/auth/me`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
      await flushMicrotasks();
      expect(service.currentUser()).toEqual(mockUser);
      expect(service.isAuthenticated()).toBe(true);
      expect(service.isGuest()).toBe(false);
    });

    it('should clear token and stay guest when /me fails on startup', async () => {
      setup(true);
      const req = httpMock.expectOne(`${environment.apiUrl}/v1/auth/me`);
      req.flush(null, { status: 401, statusText: 'Unauthorized' });
      await flushMicrotasks();
      expect(tokenServiceMock.clear).toHaveBeenCalled();
      expect(service.currentUser()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('signIn', () => {
    it('should POST credentials, save token with persistent flag, and load user', async () => {
      setup(false);
      const credentials = { identifier: 'a@b.com', password: 'pass' };
      const promise = service.signIn(credentials, true);

      const signInReq = httpMock.expectOne(`${environment.apiUrl}/v1/auth/sign-in`);
      expect(signInReq.request.method).toBe('POST');
      expect(signInReq.request.body).toEqual(credentials);
      signInReq.flush({ access_token: 'jwt-token' });
      await flushMicrotasks();

      const meReq = httpMock.expectOne(`${environment.apiUrl}/v1/auth/me`);
      meReq.flush(mockUser);

      await promise;

      expect(tokenServiceMock.save).toHaveBeenCalledTimes(1);
      expect(tokenServiceMock.save).toHaveBeenCalledWith('jwt-token', true);
      expect(service.currentUser()).toEqual(mockUser);
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should pass persistent=false to tokenService when flag is false', async () => {
      setup(false);
      const promise = service.signIn({ identifier: 'a@b.com', password: 'pass' }, false);

      httpMock
        .expectOne(`${environment.apiUrl}/v1/auth/sign-in`)
        .flush({ access_token: 'jwt-token' });
      await flushMicrotasks();
      httpMock.expectOne(`${environment.apiUrl}/v1/auth/me`).flush(mockUser);

      await promise;
      expect(tokenServiceMock.save).toHaveBeenCalledWith('jwt-token', false);
    });
  });

  describe('signUp', () => {
    it('should POST payload, save non-persistent token, and load user', async () => {
      setup(false);
      const dto: SignUpDto = {
        email: 'a@b.com',
        password: 'pass',
        username: 'newbie',
        full_name: 'New User',
      };
      const promise = service.signUp(dto);

      const signUpReq = httpMock.expectOne(`${environment.apiUrl}/v1/auth/sign-up`);
      expect(signUpReq.request.method).toBe('POST');
      expect(signUpReq.request.body).toEqual(dto);
      signUpReq.flush({ access_token: 'jwt-token' });
      await flushMicrotasks();

      httpMock.expectOne(`${environment.apiUrl}/v1/auth/me`).flush(mockUser);

      await promise;
      expect(tokenServiceMock.save).toHaveBeenCalledWith('jwt-token', false);
      expect(service.currentUser()).toEqual(mockUser);
    });
  });

  describe('signOut', () => {
    it('should clear token and reset current user', async () => {
      setup(true);
      httpMock.expectOne(`${environment.apiUrl}/v1/auth/me`).flush(mockUser);
      await flushMicrotasks();
      expect(service.currentUser()).toEqual(mockUser);

      service.signOut();

      expect(tokenServiceMock.clear).toHaveBeenCalled();
      expect(service.currentUser()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
      expect(service.isGuest()).toBe(true);
    });
  });

  describe('resetPassword', () => {
    it('should POST email to reset-password endpoint', async () => {
      setup(false);
      const promise = service.resetPassword('a@b.com');

      const req = httpMock.expectOne(`${environment.apiUrl}/v1/auth/reset-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: 'a@b.com' });
      req.flush({});

      await expect(promise).resolves.toBeUndefined();
    });
  });
});
