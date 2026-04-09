import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// 🔐 AUTH
import { AuthService } from '../../../../core/auth/auth.service';

// 🔥 MODULE SERVICE
import { ModuleService } from '../../../../core/services/module.service';


import { ModuleCardComponent } from '../../../../shared/components/module-card/module-card.component';


// SAP
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { TileModule } from '@fundamental-ngx/core/tile';
import { IconModule } from '@fundamental-ngx/core/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DynamicPageModule, TileModule, IconModule,ModuleCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  modules: any[] = [];
  filteredModules: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private moduleService: ModuleService // ✅ NUEVO
  ) {}

  async ngOnInit() {

    // 🔥 OBTENER MÓDULOS CENTRALIZADOS
    this.modules = this.moduleService.getReportModules();

    // 🔐 ROLES
    const roles = await this.auth.getRoles();

    const userRoles = roles.map((r: string) => r.toLowerCase());

    // 🔥 FILTRO POR ROLES
    this.filteredModules = this.modules.filter(m =>
      !m.roles || m.roles.some((role: string) =>
        userRoles.includes(role.toLowerCase())
      )
    );
  }

  go(route: string) {
    this.router.navigate([route]);
  }
}