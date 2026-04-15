import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-powerbi-view',
  standalone: true,
  templateUrl: './powerbi-view.component.html',
  styleUrls: ['./powerbi-view.component.scss']
})
export class PowerbiViewComponent {

  safeUrl!: SafeResourceUrl;

  // 🔥 MAPA DE REPORTES
  reportMap: any = {
    avance_ejecutivas: 'https://app.powerbi.com/view?r=eyJrIjoiZjAwNWIyZGMtZjI1MC00NDdjLTlhYzItN2RlMGNjZjc2YWRjIiwidCI6ImUwY2NmYTAxLWVmN2MtNGNlNS1hYzFjLWI3ZWVhOWIwMDZjYiJ9&navContentPaneEnabled=false',
    control_operaciones: 'https://app.powerbi.com/view?r=eyJrIjoiZmRkMmIwN2UtODdjNS00YTY1LTkyNzAtZTM1NDkzOTJlNTQ0IiwidCI6ImUwY2NmYTAxLWVmN2MtNGNlNS1hYzFjLWI3ZWVhOWIwMDZjYiJ9',
    funnel_conversion: 'https://app.powerbi.com/view?r=eyJrIjoiNTg3NTI2MmMtNzk2Mi00OGJjLWJkNjktNDRjOWFlN2ZkYmYzIiwidCI6ImUwY2NmYTAxLWVmN2MtNGNlNS1hYzFjLWI3ZWVhOWIwMDZjYiJ9'
  };

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const reportKey = this.route.snapshot.paramMap.get('id') || 'avance';

    const url = this.reportMap[reportKey];

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${url}&navContentPaneEnabled=false&filterPaneEnabled=false`
    );
  }
}



      
