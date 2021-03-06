import { EditTicketComponent } from './help/tickets/edit-ticket/edit-ticket.component';
import { NewTicketComponent } from './help/tickets/new-ticket/new-ticket.component';
import { TicketsComponent } from './help/tickets/tickets.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AccountModule } from './../account/account.module';
import { ForgotPasswordDialogComponent } from 'account/forgot-password-dialog/forgot-password-dialog/forgot-password-dialog.component';

import { AssignModeComponent } from './modes/assign-mode/assign-mode.component';
import { ChartsModule } from './home/charts/charts.module';
import { EditModeDialogComponent } from './modes/edit-mode/edit-mode-dialog.component';
import { CreateModeDialogComponent } from './modes/create-mode/create-mode-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModesComponent } from './modes/modes.component';
import { HelpComponent } from './help/help.component';
import { RegisterTenantComponent } from '../account/register-tenant/register-tenant.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AbpModule } from 'abp-ng2-module';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EditTenantComponent } from 'host/tenants/edit-tenant/edit-tenant.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // tenants
    TenantsComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    UserProfileComponent,
    // Modes
    ModesComponent,
    CreateModeDialogComponent,
    EditModeDialogComponent,
    ConfirmationDialogComponent,
    AssignModeComponent,
    ForgotPasswordDialogComponent,

    //
    HelpComponent,
    TicketsComponent,
    NewTicketComponent,
    EditTicketComponent,
    AdminLayoutComponent

  ],
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    CollapseModule,
    TabsModule,
    AbpModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    NgbModule,
    AccountModule
  ],
  providers: [ConfirmationDialogService],
  entryComponents: [

    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    ConfirmationDialogComponent,
    AssignModeComponent
  ],
  exports: [
    ForgotPasswordDialogComponent
  ],
})
export class AppModule { }
