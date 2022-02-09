import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Alert, AlertService } from 'src/app/shared/alert/alert.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private alertService: AlertService) { 

    this.afAuth.authState.subscribe(user => {
      let userInfo: User;
      if (user){
        localStorage.setItem('user', JSON.stringify(user));
        const storedInfo = JSON.parse(localStorage.getItem('user'));
        userInfo = new User(
          storedInfo.email, 
          storedInfo.uid, 
          storedInfo.stsTokenManager.accessToken, 
          new Date(storedInfo.stsTokenManager.expirationTime));
        const expiresIn: number = new Date(storedInfo.stsTokenManager.expirationTime).getTime() - new Date().getTime();
        this.autoLogout(expiresIn);
        const newAlert: Alert = new Alert(
          'You have been logged in as ' + storedInfo.email,
          'info',
          this.alertService.createID());
        this.alertService.addAlert(newAlert);
      } else {
        localStorage.removeItem('user');
        userInfo = null;
      }
      this.userData.next(userInfo);
    })
  }

  signInNewUser(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);
    const newAlert: Alert = new Alert(
        'You have been signed out',
        'info',
        this.alertService.createID());
      this.alertService.addAlert(newAlert);
    return this.afAuth.signOut();
  }

  getUser(){
    return this.userData;
  }

  autoLogin(){
    const storedInfo = JSON.parse(localStorage.getItem('user'));
    if(storedInfo){
      const userInfo = new User(
        storedInfo.email, 
        storedInfo.uid, 
        storedInfo.stsTokenManager.accessToken, 
        new Date(storedInfo.stsTokenManager.expirationTime));
      this.userData.next(userInfo);
    }
  }

  autoLogout(expirationDuration: number){
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
      const newAlert: Alert = new Alert(
        'Your session has ended, please log in again.',
        'info',
        this.alertService.createID());
      this.alertService.addAlert(newAlert);
    }, expirationDuration);
  }
}
