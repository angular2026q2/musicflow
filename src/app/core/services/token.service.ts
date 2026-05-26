import { Injectable } from '@angular/core';

const TOKEN_KEY = 'mf_access_token';

/**
 * @description Manages JWT token storage and retrieval.
 *
 * @securityNote `localStorage` is vulnerable to XSS attacks.
 * In production, better to replace with `httpOnly cookies` + `refresh token` rotation.
 * Current implementation is acceptable for educational purposes.
 *
 * @storageStrategy
 * - persistent = true (Keep me signed in) -> `localStorage` (survives broser restart)
 * - persistent = false -> sessionStorage (clears on browser close)
 * */
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  /** @description Saves JWT token to storage.
   * @param token - JWT access token
   * @param persistent - if `true` - saves to `localStorage`, otherwise `sessionStorage`
   */
  save(token: string, persistent = false): void {
    const storage = persistent ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
  }
  
  /** @description Retrieves JWT token from storage.
   *
   * Checks `sessionStorage` first, then `localStorage`
   * @returns JWT token string or `null` if not found
   */
  get(): string | null {
    return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY);
  }
  
  /** @description Removes JWT token from both storages.
   *  Called on `logout`.*/
  clear(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
  
  /** @description Returns true if a token exists in either storage.*/
  exists(): boolean {
    return !!this.get();
  }
}
