import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

/* todo: вынести потом в TokenService и подтягивать из .. пока не придумал!
 *   Ниже - временная заглушка */
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

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${DEV_BEARER_TOKEN}` },
  });
  return next(authReq);
};
