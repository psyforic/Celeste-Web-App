import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog/forgot-password-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account.component';
import { RegisterTenantComponent } from './register-tenant/register-tenant.component';
import { TenantLoginComponent } from './tenant-login/tenant-login.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AccountComponent,
                children: [
                    { path: 'login', component: LoginComponent },
                    { path: 'register', component: RegisterComponent },
                    { path: 'register-tenant', component: RegisterTenantComponent },
                    { path: 'tenant-login', component: TenantLoginComponent },
                    { path: 'forgot-password', component: ForgotPasswordDialogComponent }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule { }
