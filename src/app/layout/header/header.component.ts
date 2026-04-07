import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// SAP
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';

// Auth
import { AuthService } from '../../core/auth/auth.service';

// 🔥 MSAL (FIX IMPORTANTE)
import { MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ShellbarModule, AvatarModule, ButtonModule, IconModule, PopoverModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName = 'Usuario';
  userEmail = '';
  userRole = '';
  userPhoto: string | null = null;

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
    private router: Router,
    private auth: AuthService,
    private msalBroadcast: MsalBroadcastService, // 🔥 CLAVE
  ) {}

  ngOnInit() {
    // 🔥 ESPERAR A MSAL (SOLUCIÓN DEFINITIVA)
    this.msalBroadcast.inProgress$
      .pipe(filter((status) => status === InteractionStatus.None))
      .subscribe(() => {
        console.log('🔥 MSAL LISTO → HEADER');

        this.loadUser();
      });
  }

  async loadUser() {
    setTimeout(async () => {
  this.userPhoto = await this.auth.getUserPhoto();
  console.log('🖼️ FOTO USUARIO:', this.userPhoto);
});

    if (!this.auth.isLoggedIn()) return;

    let user = this.auth.getUser();

    console.log('🔍 USER INICIAL:', user);

    // 🔥 FIX EXTRA (por si acaso)
    if (!user) {
      const accounts = (this.auth as any).msal.instance.getAllAccounts();

      console.log('🔍 ACCOUNTS DISPONIBLES:', accounts);

      if (accounts.length > 0) {
        (this.auth as any).msal.instance.setActiveAccount(accounts[0]);
        user = accounts[0];
      }
    }

    console.log('🔍 USER FINAL:', user);

    const claims: any = user?.idTokenClaims || {};

    console.log('🔍 CLAIMS COMPLETOS:', claims);

    // 📧 EMAIL
    const email = claims.preferred_username || claims.email || user?.username || '';

    // 👤 NOMBRE (INTELIGENTE)
    const name =
      claims.name ||
      `${claims.given_name || ''} ${claims.family_name || ''}`.trim() ||
      email.split('@')[0] ||
      'Usuario';

    console.log('👤 NOMBRE USUARIO:', name);
    console.log('📧 EMAIL USUARIO:', email);

    this.userEmail = email;

    // 🔥 FORMATO BONITO
    this.userName = name.replace('.', ' ');

    // 🔐 ROLES
    const roles = await this.auth.getRoles();

    console.log('🔍 ROLES:', roles);

    // 🧾 FORMATO ROL
    this.userRole =
      roles.length > 0
        ? roles[0].replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
        : 'Sin rol';

    const userRoles = roles.map((r: string) => r.toLowerCase());

    // 🎯 FILTRO DE MÓDULOS
    this.filteredModules = this.modules.filter(
      (m) => !m.roles || m.roles.some((role) => userRoles.includes(role.toLowerCase())),
    );

    console.log('🔍 MODULES FILTRADOS:', this.filteredModules);
  }

  go(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.auth.logout();
  }
}
