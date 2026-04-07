import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const msal = inject(MsalService);
  const auth = inject(AuthService);
  const account = msal.instance.getActiveAccount();

  if (!account) {
    return next(req);
  }

 const tokenRequest = {
  scopes: [environment.azure.scopes.api],
  account: account
};

  return from(msal.instance.acquireTokenSilent(tokenRequest)).pipe(

    switchMap(response => {

      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${response.accessToken}`
        }
      });

      return next(clonedRequest);
    }),

    catchError(err => {

      if (err.status === 401) {
        auth.login();
      }

      if (err.status === 403) {
        alert('No tienes permisos para esta acción');
      }

      return throwError(() => err);
    })
  );
};