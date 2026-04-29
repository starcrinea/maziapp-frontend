import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

import { loginRequest } from './core/auth/msal.config';
import { HeaderComponent } from './layout/header/header.component';

// 🔥 LOADING
import { LoadingService } from './core/services/loading.service';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule, LoadingComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {
  loading$;

  constructor(
    private msal: MsalService,
    private msalBroadcast: MsalBroadcastService,
    private loadingService: LoadingService,
  ) {
    // ✔ aquí ya está inicializado
    this.loading$ = this.loadingService.loading$;
  }

  async ngOnInit(): Promise<void> {
    await this.msal.instance.initialize();
    await this.msal.instance.handleRedirectPromise();

    this.msalBroadcast.inProgress$
      .pipe(filter((status) => status === InteractionStatus.None))
      .subscribe(() => {
        const accounts = this.msal.instance.getAllAccounts();

        if (accounts.length > 0) {
          this.msal.instance.setActiveAccount(accounts[0]);
        } else {
          this.msal.loginRedirect(loginRequest);
        }
      });
  }
}
