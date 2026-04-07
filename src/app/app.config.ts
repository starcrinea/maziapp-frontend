import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';


import { routes } from './app.routes';

import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';

// 🔐 MSAL
import { MsalModule } from '@azure/msal-angular';
import { msalInstance } from './core/auth/msal.config';
import { InteractionType } from '@azure/msal-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideAnimations(),

    provideHttpClient(withInterceptors([authInterceptor])),

    // 🎨 SAP Fundamental Theme
    provideTheming({
      defaultTheme: 'sap_horizon',
      changeThemeOnQueryParamChange: true,
    }),
    themingInitializer(),

    // 🔐 MSAL CONFIGURACIÓN CORRECTA
    importProvidersFrom(
      MsalModule.forRoot(
        msalInstance,
        {
          interactionType: InteractionType.Redirect,
          authRequest: {
  scopes: [environment.azure.scopes.api],
},
        },
        {
          interactionType: InteractionType.Redirect,
          protectedResourceMap: new Map(),
        },
      ),
    ),
  ],
};
