import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private mainModules = [
    {
      title: 'Contactos',
      subtitle: 'Módulo de contactos',
      icon: 'contacts',
      route: '/contactos',
      roles: ['ejecutivo_inversion', 'supervisor_inversion'],
    },
    {
      title: 'Prospectos',
      subtitle: 'Módulo de inversiones',
      icon: 'business-objects-experience',
      route: '/prospectos',
      roles: ['ejecutivo_inversion', 'supervisor_inversion'],
    },
    {
      title: 'Operaciones',
      subtitle: 'Módulo de inversiones',
      icon: 'line-chart',
      route: '/reportes',
      roles: ['supervisor_inversion'],
    },
  ];
 
  private reportModules = [
    {
      title: 'Avance ejecutivas',
      icon: 'line-chart',
      route: '/reportes/1',
      roles: ['ejecutivo_inversion', 'supervisor_inversion'],
    },
    {
      title: 'Funnel conversión',
      icon: 'bar-chart',
      route: '/reportes/2',
      roles: ['supervisor_inversion'],
    },
    {
      title: 'Control de operaciones',
      icon: 'settings',
      route: '/reportes/2',
      roles: ['supervisor_inversion'],
    }
  ];

  getMainModules() {
    return this.mainModules;
  }

  getReportModules() {
    return this.reportModules;
  }
}