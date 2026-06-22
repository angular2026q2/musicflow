import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import type { UserProfile } from '@shared/interfaces/user-profile.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = '/api/v1/users';

  getProfile() {
    return httpResource<UserProfile>(() => `${this.baseUrl}/profile`);
  }

  updateProfile(dto: { username?: string; full_name?: string }) {
    return this.http.patch<UserProfile>(`${this.baseUrl}/profile`, dto);
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UserProfile>(`${this.baseUrl}/profile/avatar`, formData);
  }

  deleteAvatar() {
    return this.http.delete<UserProfile>(`${this.baseUrl}/profile/avatar`);
  }

  deleteAccount() {
    return this.http.delete<void>(`${this.baseUrl}/account`);
  }
}
