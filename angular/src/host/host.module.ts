import { EditTenantComponent } from './tenants/edit-tenant/edit-tenant.component';
import { CreateTenantComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { ModeServiceProxy } from '@shared/service-proxies/service-proxies';
import { UserModesServiceProxy } from './../shared/service-proxies/service-proxies';
import { NewModeComponent } from './modes/new-mode/new-mode.component';
import { EditModeComponent } from './modes/edit-mode/edit-mode.component';
import { BrowserModule } from '@angular/platform-browser';
import { HostRoutingModule } from './host-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { ModesComponent } from './modes/modes.component';
import { HomeComponent } from './home/home.component';
import { LayoutsModule } from './layouts/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './host.component';
import { TenantsComponent } from './tenants/Tenants.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ChartsModule } from './home/charts/charts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from '@app/app-routing.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    HostRoutingModule,
    BsDropdownModule,
    ChartsModule,
    FormsModule,
    CollapseModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [
    HostComponent,
    HomeComponent,
    TenantsComponent,
    CreateTenantComponent,
    EditTenantComponent,
    ModesComponent,
    EditModeComponent,
    NewModeComponent,
    TicketsComponent
  ],
  providers: [ModeServiceProxy]
})
export class HostModule { }
