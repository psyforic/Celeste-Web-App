import { Injectable } from '@angular/core';
import { PermissionCheckerService, AbpSessionService } from 'abp-ng2-module';
import { AppSessionService } from '../session/app-session.service';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _permissionChecker: PermissionCheckerService,
        private _router: Router,
        private _sessionService: AppSessionService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this._sessionService.tenantId && this._sessionService.userId) {
            this._router.navigate(['/host/dashboard']);
            return true;
        }
        if (!this._sessionService.user) {
            this._router.navigate(['/account/tenant-login']);
            return false;
        }

        if (!route.data || !route.data['permission']) {
            return true;
        }

        if (this._permissionChecker.isGranted(route.data['permission'])) {
            return true;
        }

        this._router.navigate([this.selectBestRoute()]);
        return false;
    }

    canLoad(route: ActivatedRouteSnapshot): boolean {
        if (!this._sessionService.tenantId && this._sessionService.userId) {
            this._router.navigate(['/host/dashboard']);
            return true;
        } else if (this._sessionService.userId && this._sessionService.tenantId) {
            this._router.navigate(['/app/home']);
            return true;
        }
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    selectBestRoute(): string {
        if (this._sessionService.user && !this._sessionService.tenantId) {
            return '/host/dashboard';
        }
        if (!this._sessionService.user) {
            return '/account/tenant-login';
        }

        if (this._permissionChecker.isGranted('Pages.Users') && this._sessionService.tenantId) {
            return '/app/admin/users';
        }
        return '/app/home';
    }
}
