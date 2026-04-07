import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

// SAP Fundamental NGX
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { TileModule } from '@fundamental-ngx/core/tile';
import { IconModule } from '@fundamental-ngx/core/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DynamicPageModule, TileModule, IconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modules = [
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
      title: 'Reportes',
      subtitle: 'Módulo de inversiones',
      icon: 'line-chart',
      route: '/reportes',
      roles: ['supervisor_inversion'],
    },
  ];

  filteredModules: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  async ngOnInit() {

  // 🔥 esperar el resultado
  const roles = await this.auth.getRoles();

  console.log('🔍 ROLES HOME:', roles);

  // 🔥 tipado correcto
  const userRoles = roles.map((r: string) => r.toLowerCase());

  this.filteredModules = this.modules.filter(m =>
    !m.roles || m.roles.some(role => userRoles.includes(role.toLowerCase()))
  );
}

  go(route: string) {
    this.router.navigate([route]);
  }
}
