import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, IconModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {}
