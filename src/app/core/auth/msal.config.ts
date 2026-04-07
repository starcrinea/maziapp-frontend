import { PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../../../environments/environment';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: environment.azure.clientId,
    authority: `https://login.microsoftonline.com/${environment.azure.tenantId}`,
    redirectUri: environment.azure.redirectUri
  },
  cache: {
    cacheLocation: 'localStorage'
  }
});

// 🔐 LOGIN
export const loginRequest = {
  scopes: [environment.azure.scopes.api]
};