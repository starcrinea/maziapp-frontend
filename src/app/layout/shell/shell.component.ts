import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// 🔥 IMPORTA TU HEADER
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header></app-header>

    <div class="page-container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ShellComponent {}