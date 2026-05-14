import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';

// 🔥 TABS CORE
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
  selector: 'app-contacto-ficha',

  standalone: true,

  imports: [CommonModule, DynamicPageModule, TabsModule],

  templateUrl: './contacto-ficha.component.html',

  styleUrls: ['./contacto-ficha.component.scss'],
})
export class ContactoFichaComponent implements OnInit {
  contactoId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.contactoId = this.route.snapshot.paramMap.get('id') || '';

    console.log('CONTACTO ID:', this.contactoId);
  }
}
