import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { PaginationModule } from '@fundamental-ngx/core/pagination';

import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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
export class ContactosComponent implements OnInit, AfterViewInit {
  contactos: any[] = [];
  loading = false;
  totalItems = 0;

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  constructor(
    private contactosService: ContactosService,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    // 🔥 CARGA INICIAL
    this.cargarContactos();

    // 🔥 ESCUCHA CUANDO SE CREA UN CONTACTO
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
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando contactos', err);
      },
    });
  }

  // ➕ Abrir modal
  nuevoContacto() {
    const dialogRef = this.dialogService.open(ContactoModalComponent, {
      responsivePadding: true,
    });

    // 🔥 Cuando se cierre el modal
    dialogRef.afterClosed.subscribe((result) => {
      // si guardó
      if (result) {
        this.cargarContactos(); // refresca tabla
      }
    });
  }
}
