import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [MsalGuard],
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'reportes/avance_ejecutivas',

    canActivate: [MsalGuard, roleGuard(['ejecutivo_inversion', 'supervisor_inversion'])],
    loadComponent: () =>
      import('./features/reportes/pages/powerbi-view/powerbi-view.component').then(
        (m) => m.PowerbiViewComponent,
      ),
  },
  {
    path: 'reportes/funnel_conversion',

    canActivate: [MsalGuard, roleGuard(['supervisor_inversion'])],

    loadComponent: () =>
      import('./features/reportes/pages/powerbi-view/powerbi-view.component').then(
        (m) => m.PowerbiViewComponent,
      ),
  },
  {
    path: 'reportes/control_operaciones',

    canActivate: [MsalGuard, roleGuard(['supervisor_inversion'])],

    loadComponent: () =>
      import('./features/reportes/pages/powerbi-view/powerbi-view.component').then(
        (m) => m.PowerbiViewComponent,
      ),
  },
  {
    path: 'contactos',

    canActivate: [MsalGuard, roleGuard(['ejecutivo_inversion', 'supervisor_inversion'])],
    loadComponent: () =>
      import('./features/contactos/pages/contactos.component').then((m) => m.ContactosComponent),
  },
  {
    path: 'contactos/:id',

    canActivate: [MsalGuard, roleGuard(['ejecutivo_inversion', 'supervisor_inversion'])],

    loadComponent: () =>
      import('./features/contactos/pages/contacto-ficha.component').then(
        (m) => m.ContactoFichaComponent,
      ),
  },
];
