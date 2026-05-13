import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogRef, DialogModule } from '@fundamental-ngx/core/dialog';
import { ContactoCreate } from '../interfaces/contacto-create.interface';
import { ContactosService } from '../../../core/services/contactos.service';

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
  tipos = ['DNI', 'CE', 'PASAPORTE'];

  model: ContactoCreate = {
    tipoDocumento: 'DNI',

    dni: '',

    nombres: '',

    apellidos: '',

    celular: '',
  };

  loading = false;

  constructor(
    private dialogRef: DialogRef,

    private contactosService: ContactosService,
  ) {}

  guardar() {
    const payload = {
      tipoDocumento: this.model.tipoDocumento,

      dni: this.model.dni,

      nombres: this.model.nombres,

      apellidos: this.model.apellidos,

      celular: this.model.celular,
    };

    this.contactosService.crearContacto(payload).subscribe({
      next: () => {
        // 🔥 REFRESCA TABLA
        this.contactosService.triggerRefresh();

        // 🔥 CIERRA MODAL
        this.cerrar();
      },

      error: (err) => {
        console.error('Error creando contacto', err);
      },
    });
  }

  cerrar(): void {
    this.dialogRef.close(false);
  }
}
