import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@core/services/token.service';
import { environment } from '@environments/environment';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const isRelativeApiUrl = req.url.startsWith('/api/');
  const isAbsoluteApiUrl = req.url.startsWith(environment.apiUrl);

  if (!isRelativeApiUrl && !isAbsoluteApiUrl) return next(req);

  const absoluteUrl = isRelativeApiUrl
    ? req.url.replace('/api/', `${environment.apiUrl}/`)
    : req.url;

  const token = inject(TokenService).get();

  if (!token) {
    return next(req.clone({ url: absoluteUrl }));
  }

  return next(
    req.clone({
      url: absoluteUrl,
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
