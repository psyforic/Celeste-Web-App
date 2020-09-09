import { AppComponentBase } from '@shared/app-component-base';
import { Component, Injector, OnInit } from '@angular/core';
import { AppTenantAvailabilityState } from '@shared/AppEnums';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import {
  IsTenantAvailableInput,
  IsTenantAvailableOutput
} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tenant-login',
  templateUrl: './tenant-login.component.html',
  styleUrls: ['./tenant-login.component.css']
})
export class TenantLoginComponent extends AppComponentBase {
  saving = false;
  tenancyName = '';
  active: boolean = false;
  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
  ) {
    super(injector);
  }

  save(): void {
    if (!this.tenancyName) {
      abp.multiTenancy.setTenantIdCookie(undefined);

      location.reload();
      return;
    }

    const input = new IsTenantAvailableInput();
    input.tenancyName = this.tenancyName;

    this.saving = true;
    this._accountService
      .isTenantAvailable(input)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result: IsTenantAvailableOutput) => {
        switch (result.state) {
          case AppTenantAvailabilityState.Available:
            abp.multiTenancy.setTenantIdCookie(result.tenantId);
            window.location.href = '/account/login';
            // this._router.navigate(['account/login']);
            return;
          case AppTenantAvailabilityState.InActive:
            this.message.warn(this.l('TenantIsNotActive', this.tenancyName));
            break;
          case AppTenantAvailabilityState.NotFound:
            this.message.warn(
              this.l('ThereIsNoTenantDefinedWithName{0}', this.tenancyName)
            );
            break;
        }
      });
  }
}
