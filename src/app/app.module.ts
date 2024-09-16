import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { AccountBycustomerComponent } from './account-bycustomer/account-bycustomer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmnComponent } from './admn/admn.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthorizationInterceptor } from './interceptoes/authorisation.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    AccountsComponent,
    NewCustomerComponent,
    AccountBycustomerComponent,
    LoginComponent,
    AdmnComponent,
    AuthorizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor, // Assurez-vous que c'est le nom correct de la classe de votre intercepteur
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
