import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { MsalService } from '@azure/msal-angular';

import { InteractionRequiredAuthError } from '@azure/msal-browser';

import { from, throwError } from 'rxjs';

import { switchMap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 🔥 SOLO INTERCEPTAR API
  if (!req.url.startsWith(environment.api.baseUrl)) {
    return next(req);
  }

  const msal = inject(MsalService);

  let account = msal.instance.getActiveAccount();

  // 🔥 restaurar sesión
  if (!account) {
    const accounts = msal.instance.getAllAccounts();

    if (accounts.length > 0) {
      account = accounts[0];

      msal.instance.setActiveAccount(account);
    }
  }

  // 🔥 sin usuario
  if (!account) {
    return next(req);
  }

  const tokenRequest = {
    scopes: [environment.azure.scopes.api],

    account,
  };

  return from(msal.instance.acquireTokenSilent(tokenRequest)).pipe(
    switchMap((response) => {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${response.accessToken}`,
        },
      });

      return next(clonedRequest);
    }),

    catchError((err) => {
      // 🔥 token expirado o requiere login
      if (err instanceof InteractionRequiredAuthError) {
        msal.loginRedirect({
          scopes: [environment.azure.scopes.api],
        });

        return throwError(() => err);
      }

      console.error('Auth interceptor error:', err);

      return throwError(() => err);
    }),
  );
};
