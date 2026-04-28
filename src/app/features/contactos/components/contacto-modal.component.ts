import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContactosService } from '../../../core/services/contactos.service';

import { DialogRef, DialogService, DialogModule } from '@fundamental-ngx/core/dialog';

import { FormModule } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
  selector: 'app-contacto-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    FormModule,
    SelectModule,
    InputGroupModule,
    ButtonModule,
  ],
  templateUrl: './contacto-modal.component.html',
  styleUrls: ['./contacto-modal.component.scss'],
})
export class ContactoModalComponent {
  model = {
    tipoDocumento: 'DNI',
    dni: '',
    celular: '',
    nombres: '',
    apellidos: '',
  };

  tipos = ['DNI', 'CE', 'Pasaporte'];

  constructor(
    public dialogRef: DialogRef,
    private contactosService: ContactosService,
  ) {}

  guardar() {
    this.contactosService.crear(this.model).subscribe({
      next: () => {
        // 🔥 dispara evento global
        this.contactosService.triggerRefresh();

        // 🔥 cierra modal correctamente
        this.dialogRef.close(true);
      },
      error: (err) => console.error(err),
    });
  }
  cerrar() {
    this.dialogRef.close();
  }
}
