import { TicketsComponent } from './tickets/tickets.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HostComponent } from './host.component';
import { ModesComponent } from './modes/modes.component';
import { TenantsComponent } from './tenants/Tenants.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HostComponent,
                children: [
                    { path: 'dashboard', component: HomeComponent, canLoad: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, canLoad: [AppRouteGuard] },
                    { path: 'modes', component: ModesComponent, canLoad: [AppRouteGuard] },
                    { path: 'tickets', component: TicketsComponent, canLoad: [AppRouteGuard] },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class HostRoutingModule { }
