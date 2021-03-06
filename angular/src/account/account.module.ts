import { RegisterTenantSuccessComponent } from './register-tenant/register-tenant-success/register-tenant-success.component';


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccountRoutingModule } from './account-routing.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountLanguagesComponent } from './layout/account-languages.component';
import { AccountHeaderComponent } from './layout/account-header.component';
import { AccountFooterComponent } from './layout/account-footer.component';

// tenants
import { TenantChangeComponent } from './tenant/tenant-change.component';
import { TenantChangeDialogComponent } from './tenant/tenant-change-dialog.component';
import { RegisterTenantComponent } from './register-tenant/register-tenant.component';
import { TenantLoginComponent } from './tenant-login/tenant-login.component';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog/forgot-password-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ReactiveFormsModule,
        ServiceProxyModule,
        AccountRoutingModule,
        ModalModule.forChild()
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        AccountLanguagesComponent,
        AccountHeaderComponent,
        AccountFooterComponent,
        // tenant
        TenantChangeComponent,
        TenantChangeDialogComponent,
        RegisterTenantComponent,
        TenantLoginComponent,
        RegisterTenantSuccessComponent
    ],
    entryComponents: [
        // tenant
        TenantChangeDialogComponent
    ],

})
export class AccountModule {

}
