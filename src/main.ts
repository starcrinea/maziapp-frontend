import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';

import { appConfig } from './app/app.config';

import { msalInstance } from './app/core/auth/msal.config';

async function bootstrap() {
  try {
    // 🔥 inicializar MSAL antes de Angular
    await msalInstance.initialize();

    // 🔥 procesar redirect login
    await msalInstance.handleRedirectPromise();

    // 🔥 recién iniciar Angular
    await bootstrapApplication(App, appConfig);
  } catch (error) {
    console.error('Error bootstrap app:', error);
  }
}

bootstrap();
