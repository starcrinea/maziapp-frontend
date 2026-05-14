import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MsalService, MsalBroadcastService } from '@azure/msal-angular';

import { InteractionStatus } from '@azure/msal-browser';

import { filter } from 'rxjs/operators';

import { HeaderComponent } from './layout/header/header.component';

import { LoadingService } from './core/services/loading.service';

import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  loading$;

  constructor(
    private msal: MsalService,

    private msalBroadcast: MsalBroadcastService,

    private loadingService: LoadingService,

    private session: SessionService,
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  async ngOnInit(): Promise<void> {
    this.msalBroadcast.inProgress$
      .pipe(filter((status) => status === InteractionStatus.None))
      .subscribe(async () => {
        const accounts = this.msal.instance.getAllAccounts();

        if (accounts.length > 0) {
          this.msal.instance.setActiveAccount(accounts[0]);

          await this.session.loadSession();
        }
      });
  }
}
