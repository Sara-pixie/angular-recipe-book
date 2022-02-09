import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  subscription: Subscription;
  currentUser: User;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.getUser().subscribe(user => {
      this.isAuthenticated = !!user;
      this.currentUser = user;
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log('An error ocurred! ' + error.message);
      });
  }

}
