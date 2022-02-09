import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './components/auth/auth.service';
import { Alert, AlertService } from './shared/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  alerts: Alert[];

  constructor(private authService: AuthService,
              private alertService: AlertService){}
  ngOnInit(): void {
      this.authService.autoLogin();
      this.alerts = this.alertService.getAlerts();
      this.subscription = this.alertService.alertsChanged.subscribe(alerts =>{
        this.alerts = alerts;
      })
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
