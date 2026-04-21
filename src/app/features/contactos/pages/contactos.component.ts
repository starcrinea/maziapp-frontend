import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from '@fundamental-ngx/core/table';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { PaginationModule } from '@fundamental-ngx/core/pagination';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DynamicPageModule,
    PaginationModule,
    InputGroupModule
  ],
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  contactos: any[] = [];

  ngOnInit() {
    // 🔥 luego conectamos a backend
    this.contactos = [
      {
        dni: '08763903',
        nombres: 'ESTELA ROSA',
        apellidos: 'SALCEDO CORTEZ',
        correo: 'estesa2006@gmail.com',
        celular: '980521066',
        registrado: 'Ana Rojas'
      }
    ];
  }
}