import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '@core/services/token.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';

import type { SignInDto, SignUpDto } from '@core/services/dto/auth.dto';
import type { AuthUser } from '@shared/interfaces/auth-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  private readonly _currentUser = signal<AuthUser | null>(null);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);
  readonly isGuest = computed(() => this._currentUser() === null);

  constructor() {
    // restores session on application strt fi token exists
    if (this.tokenService.exists()) {
      void this.loadCurrentUser();
    }
  }

  /** @description Signs in user with email and password.
   * @param dto - user email and password
   * @param persistent - if true token is saved to `localStorage`
   */
  async signIn(dto: SignInDto, persistent: boolean): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<{ accessToken: string }>(`${environment.apiUrl}/v1/auth/sign-in`, dto),
    );

    this.tokenService.save(response.accessToken, persistent);
    await this.loadCurrentUser();
  }

  /** @description Register a new user.
   * @param dto - email, password, username, full_name
   */
  async signUp(dto: SignUpDto): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<{ accessToken: string }>(`${environment.apiUrl}/v1/auth/sign-up`, dto),
    );
    this.tokenService.save(response.accessToken, false);
    await this.loadCurrentUser();
  }

  /** @description Signs out current user, clears token, and resets state. */
  signOut(): void {
    this.tokenService.clear();
    this._currentUser.set(null);
  }

  /** @description Reset password: sends password reset email via musicflow-backend
   * @param email - user email
   */
  async resetPassword(email: string): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${environment.apiUrl}/v1/auth/reset-password`, { email }),
    );
  }

  /** @description Loads current user profile from `/auth/me` endpoint.
   * @note Called on app start, if token exists, and after `sign-in`/`sign-up`.
   */
  private async loadCurrentUser(): Promise<void> {
    try {
      const user = await firstValueFrom(
        this.http.get<AuthUser>(`${environment.apiUrl}/v1/auth/me`),
      );
      this._currentUser.set(user);
    } catch {
      this.tokenService.clear();
      this._currentUser.set(null);
    }
  }
}
