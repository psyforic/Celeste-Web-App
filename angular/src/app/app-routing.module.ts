import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { ModesComponent } from './modes/modes.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { HelpComponent } from './help/help.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard], canLoad: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard],
                    canLoad: [AppRouteGuard] },
                    { path: 'users/:id', component: UserProfileComponent, canActivate: [AppRouteGuard],
                    canLoad: [AppRouteGuard] },
                    { path: 'help', component: HelpComponent,  canLoad: [AppRouteGuard]  },
                    { path: 'modes', component: ModesComponent, canLoad: [AppRouteGuard]  },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
