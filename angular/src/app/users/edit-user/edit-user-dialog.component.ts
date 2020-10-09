import { UserModeListDto } from './../../../shared/service-proxies/service-proxies';
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
  UserDto,
  RoleDto,
  ModeListDto,
  ModeServiceProxy
} from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';

@Component({
  templateUrl: './edit-user-dialog.component.html',
  providers: [ModeServiceProxy]
})
export class EditUserDialogComponent extends AppComponentBase
  implements OnInit {

  saving = false;
  isLoading = false;
  user = new UserDto();
  modes: ModeListDto[] = [];
  roles: RoleDto[] = [];
  keyword = '';
  isActive: boolean | null;
  checkedRolesMap: { [key: string]: boolean } = {};
  checkedModesMap: { mode: ModeListDto };
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _userService: UserServiceProxy,
    private _modeService: ModeServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getUser();
    this.getModes();
  }

  setInitialRolesStatus(): void {
    _.map(this.roles, (item) => {
      this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
        item.normalizedName
      );
    });

  }

  isRoleChecked(normalizedName: string): boolean {
    return _.includes(this.user.roleNames, normalizedName);
  }
  isModeChecked(modeId: string) {
    if (this.user.userModes.length > 0) {
      return this.user.userModes.findIndex(m => m.modeId === modeId) > 0 ? true : false;
    }
  }
  onRoleChange(role: RoleDto, $event) {
    this.checkedRolesMap[role.normalizedName] = $event.target.checked;
  }
  onModeChange(mode: ModeListDto, $event) {
    this.checkedModesMap[mode.id] = $event.target.checked;
    console.log(mode);
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

  getCheckedModes(): UserModeListDto[] {
    const modes: UserModeListDto[] = [];
    _.forEach(this.checkedModesMap, function (value, mode) {
      if (value) {
        // modes.push(mode);
      }
    });
    return modes;
  }

  save(): void {
    this.saving = true;
    this.isLoading = true;
    this.user.roleNames = this.getCheckedRoles();
    this.user.userModes = this.getCheckedModes();
    this._userService
      .update(this.user)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
  getUser() {
    this._userService.get(this.id).subscribe((result) => {
      this.user = result;
      console.log(this.user);
      this._userService.getRoles().subscribe((result2) => {
        this.roles = result2.items;
        this.setInitialRolesStatus();
      });
    });
  }
  getModes() {
    this.isLoading = true;
    this._modeService.getAllModes()
      .pipe(finalize(() => {
        this.isLoading = false;
      })
      ).subscribe((result: any) => {
        this.modes = result.items;
        console.log(this.modes);
      });
  }
  protected delete(entity: ModeListDto): void {
    throw new Error('Method not implemented.');
  }
}
