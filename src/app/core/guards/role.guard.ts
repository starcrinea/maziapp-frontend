import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { SessionService } from '../services/session.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const session = inject(SessionService);
    const router = inject(Router);

    return session.roles$.pipe(
      map((userRoles: string[]) => {
        const normalizedUserRoles = userRoles.map((r) => r.toLowerCase());

        const hasRole = allowedRoles.some((role) =>
          normalizedUserRoles.includes(role.toLowerCase()),
        );

        if (!hasRole) {
          console.warn('Usuario sin permisos');

          router.navigate(['/']);

          return false;
        }

        return true;
      }),
    );
  };
};
