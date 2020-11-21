import { AppAuthService } from '@shared/auth/app-auth.service';
import { AbpSessionService } from 'abp-ng2-module';
import { ITenantDto, UserModeListDto } from './../../../shared/service-proxies/service-proxies';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { ModeListDto, ModeServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize, filter } from 'rxjs/operators';
class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-assign-mode',
  templateUrl: './assign-mode.component.html',
  styleUrls: ['./assign-mode.component.scss'],
  providers: [ModeServiceProxy, UserServiceProxy]
})
export class AssignModeComponent extends AppComponentBase implements OnInit {
  p = 1;
  keyword = '';
  isActive: boolean | null;
  active = false;
  saving = false;
  isLoading = false;
  mode = new ModeListDto();
  modes = new UserModeListDto();
  id: string;
  hasAccess: boolean;
  user = new UserDto();
  users: UserDto[] = [];
  userIds: number[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public _modeService: ModeServiceProxy,
    private _userService: UserServiceProxy,
    private _sessionService: AbpSessionService,
    private auth: AppAuthService,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getModes();
    this.getUsers();
    if (this.bsModalRef.content && this.bsModalRef.content.id) {
      this.id = this.bsModalRef.content.id;
    }

  }
  save(): void {
    this.saving = true;
    this.isLoading = true;
    this._modeService
      .assignModeToUsers(this.mode.id, this.userIds)
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

  getModes() {
    this._modeService.get(this.id).subscribe((result) => {
      this.mode = result;
    });
  }
  isUserChecked(userId: string) {
    if (this.user.userModes && this.user.userModes.length > 0) {
      return this.user.userModes.filter(m => m.modeId === userId).length > 0 ? true : false;
    }
    return false;
  }
  addToList(event, id: number) {
    const index = this.userIds.findIndex(x => x === id);
    if (event.target.checked) {
      if (index === -1) {
        this.userIds.push(id);
      } else {
        return;
      }
    } else {
      if (index !== -1) {
        this.userIds = this.userIds.filter(x => x !== id);
      } else {
        return;
      }
    }
  }
  /***
   * Get Users and filter out the ones that already have this modes
   * To get the ones that have the mode
   * this.users = result.items.filter(user => user.userModes.filter(m => m.modeId === this.id).length > 0);
   * then
   */
  getUsers() {
    this.isLoading = true;
    this._userService.getAllUsers()
      .pipe(finalize(() => {
        this.isLoading = false;
      })
      ).subscribe((result) => {
        if (this.id) {
          this.users = result.items.filter(user => user.userModes.filter(m => m.modeId === this.id).length === 0);
        }

      });

    // console.log(this.isUserChecked());
  }
  show(mode: ModeListDto) {
    this.getUsers();
    this.getModes();
  }
  // isUserChecked() {

  //   // let myUsers: UserDto[] = [];
  //   // = return myUsers = this.users.filter(user => user.userModes.findIndex(x => x.id === this.mode.id));
  // }
}
