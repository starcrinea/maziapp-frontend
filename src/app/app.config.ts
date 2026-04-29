import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

// 🎨 SAP Fundamental
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';

// 🔐 MSAL
import { MsalModule } from '@azure/msal-angular';
import { msalInstance } from './core/auth/msal.config';
import { InteractionType } from '@azure/msal-browser';

// 🔐 INTERCEPTORS
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // 🧭 ROUTES
    provideRouter(routes),

    // 🎞 ANIMATIONS
    provideAnimations(),

    // 🌐 HTTP CLIENT + INTERCEPTORS
    provideHttpClient(
      withInterceptors([
        authInterceptor, // 🔐 primero auth
        loadingInterceptor, // ⏳ luego loading
      ]),
    ),

    // 🎨 SAP THEME
    provideTheming({
      defaultTheme: 'sap_horizon',
      changeThemeOnQueryParamChange: true,
    }),
    themingInitializer(),

    // 🔐 MSAL CONFIG
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
