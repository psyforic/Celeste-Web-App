import { RegisterTenantComponent } from './tenantRegister/register-tenant.component';

import { TenantLoginComponent } from './tenantLogin/tenant-login.component';
import { AccountComponent } from './account.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccountComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'tenant-login', component: TenantLoginComponent },
          { path: 'register-tenant', component: RegisterTenantComponent }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
