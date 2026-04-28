import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { ModuleService } from './module.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private loaded = false;

  private userSubject = new BehaviorSubject<any>(null);
  private rolesSubject = new BehaviorSubject<string[]>([]);
  private photoSubject = new BehaviorSubject<string | null>(null);
  private modulesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  user$ = this.userSubject.asObservable();
  roles$ = this.rolesSubject.asObservable();
  photo$ = this.photoSubject.asObservable();
  modules$ = this.modulesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(
    private auth: AuthService,
    private moduleService: ModuleService,
  ) {}

  async loadSession() {
    if (this.loaded && this.userSubject.value) return;

    this.loadingSubject.next(true);

    try {
      if (!this.auth.isLoggedIn()) {
        this.loadingSubject.next(false);
        return;
      }

      const user = this.auth.getUser();
      const roles = await this.auth.getRoles();
      const photo = await this.auth.getUserPhoto();

      const allModules = this.moduleService.getMainModules();

      const normalizedRoles = roles.map((r) => r.toLowerCase());

      const filteredModules = allModules.filter(
        (m: any) =>
          !m.roles || m.roles.some((role: string) => normalizedRoles.includes(role.toLowerCase())),
      );

      this.userSubject.next(user);
      this.rolesSubject.next(roles);
      this.photoSubject.next(photo);
      this.modulesSubject.next(filteredModules);

      this.loaded = true;
    } catch (error) {
      console.error('Error cargando sesión:', error);
    }

    this.loadingSubject.next(false);
  }

  refresh() {
    this.loaded = false;
    this.loadSession();
  }

  clear() {
    this.loaded = false;
    this.userSubject.next(null);
    this.rolesSubject.next([]);
    this.photoSubject.next(null);
    this.modulesSubject.next([]);
  }
}
