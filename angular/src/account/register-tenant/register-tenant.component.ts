import { AppComponentBase } from '@shared/app-component-base';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTenantDto, TenantDto, TenantRegistrationServiceProxy, TenantServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register-tenant',
  templateUrl: './register-tenant.component.html',
  providers: [TenantRegistrationServiceProxy],
  styleUrls: ['./register-tenant.component.css']
})
export class RegisterTenantComponent extends AppComponentBase implements OnInit {
  saving = false;
  isLoading = false;
  form_register: FormGroup;
  passwordPattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
  tenant: CreateTenantDto = new CreateTenantDto();
  public _tenantService: TenantServiceProxy;

  constructor(injector: Injector,
    private _tenantRegistrationService: TenantRegistrationServiceProxy,
    private _router: Router,
    private fb: FormBuilder
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.form_register = this.fb.group({
      name: ['', Validators.required],
      tenancyName: ['', Validators.required],
      adminEmailAddress: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.compose([Validators.required])]
    }, {
      validator: this.confirmPasswordMatch('password', 'confirmPassword')
    });
  }
  confirmPasswordMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const _pass = formGroup.controls[password];
      const _confirmPass = formGroup.controls[confirmPassword];
      if (_pass.value !== _confirmPass.value) {
        _confirmPass.setErrors({ confirmPasswordMatch: true });
      } else {
        _confirmPass.setErrors(null);
      }
    };
  }
  save() {
    // const tenancyName = (this.form_register.get('tenancyName').value).replace(/\s/g, '');
    this.saving = true;
    this.isLoading = true;
    this.tenant.email = this.form_register.get('adminEmailAddress').value;
    this.tenant.adminEmailAddress = this.form_register.get('adminEmailAddress').value;
    this.tenant.tenancyName = this.form_register.get('tenancyName').value;
    this.tenant.password = this.form_register.get('password').value;
    this.tenant.name = this.form_register.get('tenancyName').value;
    this.tenant.firstName = this.form_register.get('firstName').value;
    this.tenant.lastName = this.form_register.get('lastName').value;
    this.tenant.connectionString = '';
    this._tenantRegistrationService.registerTenant(this.tenant)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.isLoading = false;
        })
      )
      .subscribe((result: TenantDto) => {
        this.saving = true;
        this.isLoading = false;
        this._router.navigate(['account/tenant-login']);

      });
  }

}
