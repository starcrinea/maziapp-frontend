import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private mainModules = [
    {
      title: 'Inicio',
      subtitle: 'Reportes',
      icon: 'line-chart',
      route: '/',
    },
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
      icon: 'loan',
      route: '/reportes',
      roles: ['supervisor_inversion'],
    },
  ];
 
  private reportModules = [
    {
      title: 'Avance ejecutivas',
      icon: 'line-chart',
      route: '/reportes/avance_ejecutivas',
      roles: ['ejecutivo_inversion', 'supervisor_inversion'],
    },
    {
      title: 'Funnel conversión',
      icon: 'bar-chart',
      route: '/reportes/funnel_conversion',
      roles: ['supervisor_inversion'],
    },
    {
      title: 'Control de operaciones',
      icon: 'loan',
      route: '/reportes/control_operaciones',
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