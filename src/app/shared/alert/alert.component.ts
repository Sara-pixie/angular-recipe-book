import { Component, Input, OnInit, Output } from '@angular/core';
import { Alert, AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input()
  alert: Alert;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.onClose();
    }, 10000);
  }

  onClose(){
    this.alertService.removeAlert(this.alert);
  }

}
