import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { loginRequest } from './core/auth/msal.config';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {
  constructor(
    private msal: MsalService,
    private msalBroadcast: MsalBroadcastService,
  ) {}

 ngOnInit(): void {

  this.msalBroadcast.inProgress$
    .pipe(filter(status => status === InteractionStatus.None))
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
