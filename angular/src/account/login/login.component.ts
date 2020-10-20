// import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-passwords.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Injector, ViewChild } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
  // @ViewChild('forgotPasswordModal', { static: false }) showForgotPassword: ForgotPasswordDialogComponent;
  submitting = false;
  enabled = false;
  isLoading = false;
  constructor(
    injector: Injector,
    public authService: AppAuthService,
    private _sessionService: AbpSessionService,
    private modalService: NgbModal,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {
    this.submitting = true;
    this.isLoading = true;
    this.authService.authenticate(() => {
      this.submitting = false;
      this.isLoading = false;
    });
  }
  openModal() {
   
  }

}
