import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // Show loading for non-GET requests or requests that might take time
  if (req.method !== 'GET' || req.url.includes('oauth2') || req.url.includes('userinfo')) {
    loadingService.show();
  }

  return next(req).pipe(
    finalize(() => {
      loadingService.hide();
    })
  );
};
