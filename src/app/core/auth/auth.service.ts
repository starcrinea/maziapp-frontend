import { loginRequest } from './msal.config';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private msal: MsalService) {}

  private restoreAccount() {
    let account = this.msal.instance.getActiveAccount();

    if (!account) {
      const accounts = this.msal.instance.getAllAccounts();

      if (accounts.length > 0) {
        account = accounts[0];
        this.msal.instance.setActiveAccount(account);
      }
    }

    return account;
  }

  login() {
    this.msal.loginRedirect(loginRequest);
  }

  logout() {
    this.msal.logoutRedirect();
  }

  getUser() {
    return this.restoreAccount();
  }

  isLoggedIn(): boolean {
    return this.restoreAccount() !== null;
  }

  async getRoles(): Promise<string[]> {
    try {
      const account = this.restoreAccount();

      if (!account) return [];

      const response = await this.msal.instance.acquireTokenSilent({
        scopes: [environment.azure.scopes.api],
        account,
      });

      const decoded: any = jwtDecode(response.accessToken);

      return decoded.roles || [];
    } catch {
      return [];
    }
  }

  async getUserPhoto(): Promise<string | null> {
    try {
      const account = this.restoreAccount();

      if (!account) return null;

      const response = await this.msal.instance.acquireTokenSilent({
        scopes: [environment.azure.scopes.graph],
        account,
      });

      const res = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
        headers: {
          Authorization: `Bearer ${response.accessToken}`,
        },
      });

      if (!res.ok) return null;

      const blob = await res.blob();

      return URL.createObjectURL(blob);
    } catch {
      return null;
    }
  }
}
