import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { PaginationModule } from '@fundamental-ngx/core/pagination';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogService } from '@fundamental-ngx/core/dialog';

import { ContactosService } from '../../../core/services/contactos.service';
import { ContactoModalComponent } from '../components/contacto-modal.component';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule, DynamicPageModule, InputGroupModule, PaginationModule],
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss'],
})
export class ContactosComponent implements OnInit {
  contactos: any[] = [];

  totalItems = 0;

  constructor(
    private contactosService: ContactosService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.cargarContactos();

    this.contactosService.refreshObservable.subscribe(() => {
      this.cargarContactos();
    });
  }

  // 🔄 Cargar desde backend
  cargarContactos() {
    this.contactosService.listar().subscribe({
      next: (data) => {
        this.contactos = data;
        this.totalItems = data.length;
      },
      error: (err) => {
        console.error('Error cargando contactos', err);
      },
    });
  }

  // ➕ Abrir modal
  nuevoContacto() {
    this.dialogService.open(ContactoModalComponent, {
      responsivePadding: true,
    });
  }
}
