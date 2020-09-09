import { UsersComponent } from '../../../../celesteangular/src/app/users/users.component';
import { ModesComponent } from '../../../../celesteangular/src/app/modes/modes.component';
import { HelpComponent } from '../help/help.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../../../celesteangular/src/app/dashboard/dashboard.component';
import { UserProfileComponent } from '../../../../celesteangular/src/app/user-profile/user-profile.component';
import { TableListComponent } from '../../../../celesteangular/src/app/table-list/table-list.component';
import { TypographyComponent } from '../../../../celesteangular/src/app/typography/typography.component';
import { IconsComponent } from '../../../../celesteangular/src/app/icons/icons.component';
import { MapsComponent } from '../../../../celesteangular/src/app/maps/maps.component';
import { NotificationsComponent } from '../../../../celesteangular/src/app/notifications/notifications.component';
import { UpgradeComponent } from '../../../../celesteangular/src/app/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'help',           component: HelpComponent},
    { path: 'modes', component: ModesComponent },
    { path: 'users', component: UsersComponent }
];
