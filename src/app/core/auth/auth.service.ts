import { loginRequest } from './msal.config';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private msal: MsalService) {}

  login() {
    this.msal.loginRedirect(loginRequest);
  }

  logout() {
    this.msal.logoutRedirect();
  }

  getUser() {
    try {
      return this.msal.instance.getActiveAccount();
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    try {
      return this.msal.instance.getAllAccounts().length > 0;
    } catch {
      return false;
    }
  }

  // 🔥 NUEVO (CORRECTO)
  async getRoles(): Promise<string[]> {
    try {
      let account = this.msal.instance.getActiveAccount();

      if (!account) {
        const accounts = this.msal.instance.getAllAccounts();
        if (accounts.length > 0) {
          account = accounts[0];
          this.msal.instance.setActiveAccount(account);
        }
      }

      if (!account) return [];

      const response = await this.msal.instance.acquireTokenSilent({
        scopes: [loginRequest.scopes[0]],
        account
      });

      const decoded: any = jwtDecode(response.accessToken);

      console.log('🔍 ACCESS TOKEN DECODED:', decoded);
      console.log('🔍 ROLES FROM TOKEN:', decoded.roles);

      return decoded.roles || [];

    } catch (error) {
      console.error('❌ Error obteniendo roles:', error);
      return [];
    }
  }


  async getUserPhoto(): Promise<string | null> {
  try {
    let account = this.msal.instance.getActiveAccount();

    if (!account) return null;

    const response = await this.msal.instance.acquireTokenSilent({
  scopes: [environment.azure.scopes.graph],
  account
});

    const res = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
      headers: {
        Authorization: `Bearer ${response.accessToken}`
      }
    });

    if (!res.ok) return null;

    const blob = await res.blob();

    return URL.createObjectURL(blob);

  } catch (error) {
    console.error('❌ Error obteniendo foto:', error);
    return null;
  }
}
}