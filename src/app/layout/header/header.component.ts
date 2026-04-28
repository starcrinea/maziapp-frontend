import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../core/services/session.service';

import { DialogService } from '@fundamental-ngx/core/dialog';
import { ContactoModalComponent } from '../../features/contactos/components/contacto-modal.component';

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
  imports: [CommonModule, ShellbarModule, AvatarModule, ButtonModule, IconModule, PopoverModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showAddButton = false;

  // 👤 USER
  userName = 'Usuario';
  userEmail = '';
  userRole = '';
  userPhoto: string | null = null;
  photoReady = false;

  userInitials = '';

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
    private cdr: ChangeDetectorRef,
    private session: SessionService,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.msalBroadcast.inProgress$
      .pipe(filter((status) => status === InteractionStatus.None))
      .subscribe(() => {
        this.session.loadSession();
      });

    this.session.user$.subscribe((user) => {
      if (!user) return;

      const claims: any = user.idTokenClaims || {};

      const email = claims.preferred_username || claims.email || user.username || '';

      const name = claims.name || email.split('@')[0];

      queueMicrotask(() => {
        this.userName = name;
        this.userEmail = email;
        this.userInitials = this.getInitials(name);
        this.cdr.markForCheck();
      });
    });

    this.session.photo$.subscribe((photo) => {
      if (!photo) return;

      queueMicrotask(() => {
        this.userPhoto = photo;
        this.photoReady = true;
        this.cdr.markForCheck();
      });
    });

    this.session.roles$.subscribe((roles) => {
      queueMicrotask(() => {
        this.userRole = roles.length > 0 ? roles[0] : 'Sin rol';
        this.cdr.markForCheck();
      });
    });

    this.session.modules$.subscribe((modules) => {
      queueMicrotask(() => {
        this.filteredModules = modules;
        this.cdr.markForCheck();
      });
    });

    this.session.loading$.subscribe((state) => {
      queueMicrotask(() => {
        this.isLoading = state;
        this.cdr.markForCheck();
      });
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showAddButton = event.url.includes('/contactos');
      });
  }

  abrirNuevoContacto() {
    this.dialogService.open(ContactoModalComponent, {
      responsivePadding: true,
    });
  }

  // 🚀 NAVEGACIÓN
  go(route: string) {
    this.router.navigate([route]);
  }

  // 🔒 LOGOUT
  logout() {
    this.auth.logout();
  }

  getInitials(name: string): string {
    if (!name) return '';

    const parts = name
      .trim()
      .split(' ')
      .filter((p) => p.length > 0);

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    const first = parts[0];
    const last = parts[parts.length - 1];

    return (first[0] + last[0]).toUpperCase();
  }
}
