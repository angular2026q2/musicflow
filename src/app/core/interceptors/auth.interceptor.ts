import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@core/services/token.service';
import { environment } from '@environments/environment';

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
