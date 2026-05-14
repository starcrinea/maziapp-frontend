import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { ModuleService } from './module.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private loaded = false;

  // 🔥 evita cargas paralelas
  private loadingPromise: Promise<void> | null = null;

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
    // 🔥 sesión ya cargada
    if (this.loaded && this.userSubject.value) {
      return;
    }

    // 🔥 reutilizar carga activa
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = this.internalLoadSession();

    await this.loadingPromise;

    this.loadingPromise = null;
  }

  private async internalLoadSession() {
    this.loadingSubject.next(true);

    try {
      // 🔥 usuario no autenticado
      if (!this.auth.isLoggedIn()) {
        this.clear();

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

      this.clear();
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async refresh() {
    this.loaded = false;

    await this.loadSession();
  }

  clear() {
    this.loaded = false;

    this.userSubject.next(null);

    this.rolesSubject.next([]);

    this.photoSubject.next(null);

    this.modulesSubject.next([]);
  }
}
