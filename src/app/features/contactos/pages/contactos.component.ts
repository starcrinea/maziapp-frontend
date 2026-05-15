import { CommonModule } from '@angular/common';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';

import { InputGroupModule } from '@fundamental-ngx/core/input-group';

import { PaginationModule } from '@fundamental-ngx/core/pagination';

import { TableModule } from '@fundamental-ngx/core/table';

import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';

import { ButtonModule } from '@fundamental-ngx/core/button';

import { IconModule } from '@fundamental-ngx/core/icon';

import { DialogService } from '@fundamental-ngx/core/dialog';

import { ContactosService } from '../../../core/services/contactos.service';

import { ContactoModalComponent } from '../components/contacto-modal.component';

@Component({
  selector: 'app-contactos',

  standalone: true,

  imports: [
    CommonModule,

    FormsModule,

    ReactiveFormsModule,

    DynamicPageModule,

    InputGroupModule,

    PaginationModule,

    TableModule,

    BusyIndicatorModule,

    ButtonModule,

    IconModule,
  ],

  templateUrl: './contactos.component.html',

  styleUrls: ['./contactos.component.scss'],
})
export class ContactosComponent implements OnInit {
  contactos: any[] = [];

  contactosPaginados: any[] = [];

  totalItems = 0;

  page = 1;

  pageSize = 10;

  loading = false;

  // 🔍 filtros
  filtroDni = '';

  filtroNombres = '';

  filtroApellidos = '';

  constructor(
    private contactosService: ContactosService,

    private dialogService: DialogService,

    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarContactos();

    this.contactosService.refreshObservable.subscribe(() => {
      this.cargarContactos();
    });
  }

  // 🔄 cargar contactos
  cargarContactos() {
    this.loading = true;

    this.contactosService.listar().subscribe({
      next: (data) => {
        this.contactos = data;

        this.totalItems = data.length;

        this.aplicarFiltros();

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Error cargando contactos', err);

        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }

  // 🔍 filtros
  aplicarFiltros() {
    let filtrados = [...this.contactos];

    if (this.filtroDni) {
      filtrados = filtrados.filter((c) =>
        (c.demografia?.dni || c.dni || '')

          .toString()

          .toLowerCase()

          .includes(this.filtroDni.toLowerCase()),
      );
    }

    if (this.filtroNombres) {
      filtrados = filtrados.filter((c) =>
        (c.demografia?.nombres || c.nombres || '')

          .toLowerCase()

          .includes(this.filtroNombres.toLowerCase()),
      );
    }

    if (this.filtroApellidos) {
      filtrados = filtrados.filter((c) =>
        (c.demografia?.apellidos || c.apellidos || '')

          .toLowerCase()

          .includes(this.filtroApellidos.toLowerCase()),
      );
    }

    this.totalItems = filtrados.length;

    const start = (this.page - 1) * this.pageSize;

    const end = start + this.pageSize;

    this.contactosPaginados = filtrados.slice(start, end);
  }

  // 📄 paginación
  onPageChange(event: any) {
    this.page = event?.currentPage || event;

    this.aplicarFiltros();
  }

  // ➕ modal
  nuevoContacto() {
    this.dialogService.open(ContactoModalComponent, {
      width: '520px',

      responsivePadding: true,

      mobile: false,
    });
  }

  // 👁 ficha
  verFicha(contacto: any) {
    this.router.navigate(['/contactos', contacto.id]);
  }
}
