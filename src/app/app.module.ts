import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AuthInterceptorService } from './components/auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    SpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
