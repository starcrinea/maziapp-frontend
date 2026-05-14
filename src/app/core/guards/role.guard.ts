import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { from, of } from 'rxjs';
import { switchMap, map, catchError, take } from 'rxjs/operators';

import { SessionService } from '../services/session.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const session = inject(SessionService);
    const router = inject(Router);

    // 🔥 primero cargar sesión
    return from(session.loadSession()).pipe(
      // 🔥 luego obtener roles reales
      switchMap(() => session.roles$.pipe(take(1))),

      map((userRoles: string[]) => {
        const normalizedUserRoles = userRoles.map((r) => r.toLowerCase());

        const hasRole = allowedRoles.some((role) =>
          normalizedUserRoles.includes(role.toLowerCase()),
        );

        if (!hasRole) {
          console.warn('Usuario sin permisos', userRoles);

          router.navigate(['/']);

          return false;
        }

        return true;
      }),

      catchError((error) => {
        console.error('Error en roleGuard:', error);

        router.navigate(['/']);

        return of(false);
      }),
    );
  };
};
