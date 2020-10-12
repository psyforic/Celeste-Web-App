import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { ModeListDto, ModeServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
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
export class AssignModeComponent extends AppComponentBase{
  p: number = 1;
  keyword = '';
  isActive: boolean | null;
  active = false;
  saving = false;
  isLoading = false;
  mode = new ModeListDto();
  id: any;
  users: UserDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public _modeService: ModeServiceProxy,
    private _userService: UserServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getModes();
    this.getUsers();
  }
  save(): void {

    this.saving = true;
    this.isLoading = true;
    this._modeService
      .update(this.mode)
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
  getUsers() {

    this.isLoading = true;
    this._userService.getAllUsers()
      .pipe(finalize(() => {
        this.isLoading = false;
      })
      ).subscribe((result: any) => {
        this.users = result.items;
        console.log(this.users);
      });
  }

  isUserChecked() {

  }
}
