import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { FormModule } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { SwitchModule } from '@fundamental-ngx/core/switch';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { ContactosService } from '../../../core/services/contactos.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contacto-ficha',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    DynamicPageModule,
    TabsModule,
    FormModule,
    SelectModule,
    InputGroupModule,
    ButtonModule,
    BarModule,
    DatePickerModule,
    RadioModule,
    SwitchModule,
    FdDatetimeModule,
  ],

  templateUrl: './contacto-ficha.component.html',

  styleUrls: ['./contacto-ficha.component.scss'],
})
export class ContactoFichaComponent implements OnInit {
  contactoId = '';

  contacto: any = {
    demografia: {
      tipoDocumento: 'DNI',

      dni: '',

      nombres: '',

      apellidos: '',

      estadoCivil: '',

      fechaNacimiento: '',

      sexo: '',

      nacionalidad: '',

      paisResidencia: '',

      esPep: false,
    },

    ubicacion: {
      celular: '',

      correo: '',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private contactosService: ContactosService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.contactoId = params['id'];

      if (this.contactoId) {
        this.cargarContacto();
      }
    });
  }

  cargarContacto() {
    this.contactosService.obtenerPorId(this.contactoId).subscribe({
      next: (data) => {
        this.contacto = data;

        console.log('Contacto cargado', data);

        // 🔥 refrescar vista
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Error cargando contacto', err);
      },
    });
  }

  guardar() {
    console.log('Guardar contacto', this.contacto);
  }
}
