import { ModeListDto, UserModeListDto } from './../../../shared/service-proxies/service-proxies';
import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  CreateUserDto,
  RoleDto, ModeServiceProxy
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { FormGroup } from '@angular/forms';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';

class PagedModesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}
@Component({
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.scss'],
  providers: [ModeServiceProxy]
})
export class CreateUserDialogComponent extends PagedListingComponentBase<ModeListDto>
  implements OnInit {
  saving = false;
  frm_create_user: FormGroup;
  isLoading = false;
  active = false;
  keyword = '';
  isActive: boolean | null;
  modes: ModeListDto[] = [];
  currentOrientation = 'horizontal';
  user = new CreateUserDto();
  roles: RoleDto[] = [];
  ids: any[] = [];
  role: any;
  selectedModes: ModeListDto[] = [];
  selectedUserModes: UserModeListDto[] = [];
  checkedRolesMap: { [key: string]: boolean } = {};
  defaultRoleCheckedStatus = false;
  defaultModeCheckedStatus = false;
  allModesChecked = false;
  provinces: string[] = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'North West',
    'Western Cape',
  ];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _userService: UserServiceProxy,
    public bsModalRef: BsModalRef,
    public _ModeService: ModeServiceProxy
  ) {
    super(injector);
  }
  setInitialRolesStatus(): void {
    _.map(this.roles, (item) => {
      this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
        item.normalizedName
      );
    });
  }

  isRoleChecked(normalizedName: string): boolean {
    // just return default role checked status
    // it's better to use a setting
    return this.defaultRoleCheckedStatus;
  }
  isModeChecked(normalizedName: string): boolean {
    return this.allModesChecked;
  }

  onRoleChange(role: RoleDto, $event) {
    this.checkedRolesMap[role.normalizedName] = $event.target.checked;
    if (this.checkedRolesMap[role.normalizedName] && role.normalizedName === 'ADMIN') {
      this.allModesChecked = true;
      this.selectedModes = this.modes.map(mode => {
        const newMode = new ModeListDto();
        newMode.id = mode.id;
        return newMode;
      });
    } else {
      this.allModesChecked = false;
      this.selectedModes = [];
    }
  }
  onChangedCheckbox($event, mode: ModeListDto) {
    const index = this.selectedModes.findIndex(x => x === mode);
    if ($event.target.checked) {
      this.selectedModes.push(mode);
    } else {
      this.selectedModes.splice($event.target, 1);
    }
    console.log(this.selectedModes);
  }

  getCheckedRoles(): string[] {
    const roles: string[] = [];
    _.forEach(this.checkedRolesMap, function (value, key) {
      if (value) {
        roles.push(key);
      }
    });
    return roles;
  }

  save(): void {
    this.saving = true;
    this.isLoading = true;
    this.user.roleNames = this.getCheckedRoles();

    this.user.userModes = this.selectedModes.map(mode => {
      const userModeInput = new UserModeListDto();
      userModeInput.modeId = mode.id;
      return userModeInput;
    });
    this.user.password = '123qwe';
    this._userService
      .create(this.user)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }

  protected delete(entity: ModeListDto): void {

  }

  protected list(
    request: PagedModesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

    request.keyword = this.keyword;
    request.isActive = this.isActive;
    this.user.isActive = true;

    this._userService.getRoles().subscribe((result) => {
      this.roles = result.items;
      this.setInitialRolesStatus();
    });
    this._ModeService.getAll(request.maxResultCount, request.skipCount)
      .pipe(
        finalize(() => {
          finishedCallback();
          this.isLoading = false;
        })
      )
      .subscribe((result: any) => {
        this.modes = result.items;
        console.log(this.modes);
        this.showPaging(result, pageNumber);
      });
  }
}
