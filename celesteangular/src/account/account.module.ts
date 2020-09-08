

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterTenantComponent } from './tenantRegister/register-tenant.component';
import { TenantLoginComponent } from './tenantLogin/tenant-login.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
  ],
  declarations: [AccountComponent, TenantLoginComponent, LoginComponent, RegisterTenantComponent]
})
export class AccountModule { }
