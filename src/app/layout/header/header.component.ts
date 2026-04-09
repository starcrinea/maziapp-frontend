import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

// 🔥 NUEVO: Module Service
import { ModuleService } from '../../core/services/module.service';

// MSAL
import { MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ShellbarModule,
    AvatarModule,
    ButtonModule,
    IconModule,
    PopoverModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  // 👤 USER
  userName = 'Usuario';
  userEmail = '';
  userRole = '';
  userPhoto: string | null = null;

  // ⏳ LOADING
  isLoading = true;

  // 📦 MODULES (desde service)
  modules: any[] = [];
  filteredModules: any[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private moduleService: ModuleService, 
    private msalBroadcast: MsalBroadcastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // 🔥 CARGAR MÓDULOS DESDE SERVICE
    this.modules = this.moduleService.getMainModules();

    // 🔥 ESPERAR A MSAL
    this.msalBroadcast.inProgress$
      .pipe(filter((status) => status === InteractionStatus.None))
      .subscribe(() => {
        this.loadUser();
      });
  }

  async loadUser() {
    this.isLoading = true;

    // 🖼️ FOTO
    this.userPhoto = await this.auth.getUserPhoto();

    if (!this.auth.isLoggedIn()) {
      this.isLoading = false;
      return;
    }

    let user = this.auth.getUser();

    if (!user) {
      const accounts = (this.auth as any).msal.instance.getAllAccounts();
      if (accounts.length > 0) {
        (this.auth as any).msal.instance.setActiveAccount(accounts[0]);
        user = accounts[0];
      }
    }

    const claims: any = user?.idTokenClaims || {};

    const email =
      claims.preferred_username ||
      claims.email ||
      user?.username ||
      '';

    const name =
      claims.name ||
      `${claims.given_name || ''} ${claims.family_name || ''}`.trim() ||
      email.split('@')[0] ||
      'Usuario';

    this.userEmail = email;
    this.userName = name.replace('.', ' ');

    // 🎭 ROLES
    const roles = await this.auth.getRoles();

    this.userRole =
      roles.length > 0
        ? roles[0]
            .replace('_', ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase())
        : 'Sin rol';

    const userRoles = roles.map((r: string) => r.toLowerCase());

    // 🔥 FILTRAR MÓDULOS POR ROL
    this.filteredModules = this.modules.filter(
      (m) =>
        !m.roles ||
        m.roles.some((role: string) =>
          userRoles.includes(role.toLowerCase())
        )
    );

    this.isLoading = false;

    // 🔥 FIX Angular change detection
    this.cdr.detectChanges();
  }

  // 🚀 NAVEGACIÓN
  go(route: string) {
    this.router.navigate([route]);
  }

  // 🔒 LOGOUT
  logout() {
    this.auth.logout();
  }
}