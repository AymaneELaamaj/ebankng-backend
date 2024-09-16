import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { AccountBycustomerComponent } from './account-bycustomer/account-bycustomer.component';
import { LoginComponent } from './login/login.component';
import { AdmnComponent } from './admn/admn.component';
import { AuthenticationGuard } from './guards/authentifiaction.guard';

const routes: Routes = [
  {path:"admin",component:AdmnComponent,canActivate:[AuthenticationGuard]
    ,children:[
    {path:"cust",component:CustomersComponent},
    {path:"acc",component:AccountsComponent},
    {path:"new",component:NewCustomerComponent},
    {path:"customer/:customerId/accounts",component:AccountBycustomerComponent}]},
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:'/login',pathMatch:"full"}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
