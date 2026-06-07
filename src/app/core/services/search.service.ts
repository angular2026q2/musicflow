import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl = '/api/v1';
  private http = inject(HttpClient);
}
