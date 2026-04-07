import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// 👇 IMPORTS SAP
import { CardModule } from '@fundamental-ngx/core/card';
import { IconModule } from '@fundamental-ngx/core/icon';

@Component({
  selector: 'app-module-card',
  standalone: true, // 👈 IMPORTANTE
  imports: [CardModule, IconModule],
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss']
})
export class ModuleCardComponent {

  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Input() route!: string;

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate([this.route]);
  }
}