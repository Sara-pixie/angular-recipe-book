import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  currentUser: any = null;
  subscription: Subscription;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.subscription = this.authService.getUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      if(this.closeSub){
        this.closeSub.unsubscribe();
      }
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    let authObs: Promise<any>;
    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.loginUser(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signInNewUser(form.value.email, form.value.password);
    }
    authObs.then((userCredential) => {
      this.isLoading = false;
      //wait to get user
      setTimeout(() => {
        this.router.navigate(['/recipes']);
      }, 4);
    })
    .catch((error) => {
      this.handleError(error);
    });
    form.reset();
  }

  handleError(error){
    this.isLoading = false;
    let thisError = 'An error ocurred! ' + error.message;
    this.showErrorAlert(thisError);
  }

  private showErrorAlert(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    componentRef.instance.alertType = 'error';
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
