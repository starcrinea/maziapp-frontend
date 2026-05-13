import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-powerbi-view',

  standalone: true,

  templateUrl: './powerbi-view.component.html',

  styleUrls: ['./powerbi-view.component.scss'],
})
export class PowerbiViewComponent implements OnInit {
  safeUrl!: SafeResourceUrl;

  // 🔥 MAPA CENTRALIZADO DE REPORTES
  private reportMap: any = {
    avance_ejecutivas:
      'https://app.powerbi.com/view?r=eyJrIjoiZjAwNWIyZGMtZjI1MC00NDdjLTlhYzItN2RlMGNjZjc2YWRjIiwidCI6ImUwY2NmYTAxLWVmN2MtNGNlNS1hYzFjLWI3ZWVhOWIwMDZjYiJ9',

    control_operaciones:
      'https://app.powerbi.com/view?r=eyJrIjoiZmRkMmIwN2UtODdjNS00YTY1LTkyNzAtZTM1NDkzOTJlNTQ0IiwidCI6ImUwY2NmYTAxLWVmN2MtNGNlNS1hYzFjLWI3ZWVhOWIwMDZjYiJ9',

    funnel_conversion:
      'https://app.powerbi.com/view?r=eyJrIjoiNTg3NTI2MmMtNzk2Mi00OGJjLWJkNjktNDRjOWFlN2ZkYmYzIiwidCI6ImUwY2NmYTAxLWVmN2MtNGNlNS1hYzFjLWI3ZWVhOWIwMDZjYiJ9',
  };

  constructor(
    private route: ActivatedRoute,

    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    // 🔥 OBTENER RUTA ACTUAL
    const currentRoute = this.route.snapshot.routeConfig?.path || '';

    // 🔥 EXTRAER NOMBRE REPORTE
    const reportKey = currentRoute.split('/').pop() || '';

    // 🔥 BUSCAR URL
    const url = this.reportMap[reportKey];

    if (!url) {
      console.error('Reporte no encontrado');

      return;
    }

    // 🔥 SANITIZE URL
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${url}&navContentPaneEnabled=false&filterPaneEnabled=false`,
    );
  }
}
