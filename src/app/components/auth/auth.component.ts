import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  currentUser: any = null;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.getUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
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
    this.error = 'An error ocurred! ' + error.message;
  }
}
