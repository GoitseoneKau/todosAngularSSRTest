import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService= inject(LoaderService)
  loaderService.loading()
  return next(req).pipe(delay(5000),finalize(()=>loaderService.unloading()));
};
