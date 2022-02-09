import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Alert {
  constructor(
    public message: string, 
    public alertType: string, 
    public id: string){}
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alerts: Alert[] = [];
  alertsChanged = new Subject<Alert[]>();

  constructor() { }

  addAlert(alert: Alert){
    this.alerts.push(alert);
    this.alertsChanged.next(this.alerts.slice());
  }

  getAlerts(){
    if(!this.alerts){
      return;
    }
    return this.alerts.slice();
  }

  removeAlert(alert: Alert){
    let index = this.alerts.findIndex(object => object.id === alert.id);
    this.alerts.splice(index, 1);
    this.alertsChanged.next(this.alerts.slice());
  }

  createID(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
