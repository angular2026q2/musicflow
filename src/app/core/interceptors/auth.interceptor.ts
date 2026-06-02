import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@core/services/token.service';
import { environment } from '@environments/environment';

/**
 * todo: Sprint 2 — replace DEV_BEARER_TOKEN with real token from AuthService/TokenService (when implemented).
 * Inject AuthService, read token signal, attach to request.
 */
const DEV_BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NWE1MTcwYi1mZjhlLTQ4MGItYmNhMS02M2U2M2YwZGM4ZDQiLCJlbWFpbCI6InRlc3RfdXNlcl83NzdAZ21haWwuY29tIiwiaWF0IjoxNzgwMzkxMTIzLCJleHAiOjE3ODA5OTU5MjN9.m4pOnEUNKWludGar5oGZ-nZ0NKue7X124MgJnkIo0mQ';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  // добавляю токен только к API-запросам, не трогаю сторонние URL (jamendo, supabase, s3, и прочее)
  if (!req.url.startsWith('/api/')) {
    return next(req);
  }

  const absoluteUrl = req.url.replace('/api/', `${environment.apiUrl}/`);
  const token = inject(TokenService).get();

  if (!token) {
    return next(req.clone({ url: absoluteUrl }));
  }

  const authReq = req.clone({
    url: absoluteUrl,
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(authReq);
};
