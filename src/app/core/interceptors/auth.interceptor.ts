import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '@environments/environment';

/**
 * todo: Sprint 2 — replace DEV_BEARER_TOKEN with real token from AuthService/TokenService (when implemented).
 * Inject AuthService, read token signal, attach to request.
 */
const DEV_BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NGY5MzJiNi1iMjA3LTQ4NDAtYmU3NS0xZDBiNzM2N2JiY2QiLCJlbWFpbCI6InNvbGlkYWRvc0BleGFtcGxlLmlvIiwiaWF0IjoxNzc5NDM1NDgzLCJleHAiOjE3ODAwNDAyODN9.mfTl2qbN7luI93WfciC9qhDPexspcYWh6Ip5IyWhbw0';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  // добавляю токен только к API-запросам, не трогаю сторонние URL (jamendo, supabase, s3, и прочее)
  if (!req.url.startsWith('/api/')) {
    return next(req);
  }

  const absoluteUrl = req.url.replace('/api/', `${environment.apiUrl}/`);

  const authReq = req.clone({
    url: absoluteUrl,
    setHeaders: { Authorization: `Bearer ${DEV_BEARER_TOKEN}` },
  });

  return next(authReq);
};
