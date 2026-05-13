import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ContactoCreate } from '../../features/contactos/interfaces/contacto-create.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactosService {
  private api = `${environment.api.baseUrl}/contactos`;

  private refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.api);
  }

  crearContacto(data: ContactoCreate) {
    return this.http.post(this.api, data);
  }

  // 🔥 evento global
  get refreshObservable() {
    return this.refresh$.asObservable();
  }

  triggerRefresh() {
    this.refresh$.next();
  }
}
