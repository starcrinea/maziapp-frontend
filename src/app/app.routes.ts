import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    canActivate: [MsalGuard],
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'reportes/:id',
    canActivate: [MsalGuard],
    loadComponent: () =>
      import('./features/reportes/pages/powerbi-view/powerbi-view.component').then(
        (m) => m.PowerbiViewComponent,
      ),
  },
  {
    path: 'contactos',
    canActivate: [MsalGuard],
    loadComponent: () =>
      import('./features/contactos/pages/contactos.component').then((m) => m.ContactosComponent),
  },
];
