import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactosService {
  private api = 'http://localhost:7071/api/contactos';

  private refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.api);
  }

  crear(data: any) {
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
