import { UserServiceProxy, UserModeListDto, UserDto } from './../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, OnInit, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends AppComponentBase implements OnInit {
  isLoading = false;
  saving = false;
  isAdmin = false;
  modes: UserModeListDto[] = [];
  keyword = '';
  user: UserDto = new UserDto();
  currentUser: number;
  roleNames: any[] = [];
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
  constructor(
    injector: Injector,
    private _userService: UserServiceProxy
  ) {
    super(injector);
   }

  ngOnInit() {
    this.getUser(this.appSession.userId);
  }
  getUser(userId: number) {
    this.isLoading = true;
    this._userService
      .get(userId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result: UserDto) => {
        this.user = result;
        this.roleNames = result.roleNames;
        this.modes = this.user.userModes;
        // console.log(this.roleNames.toString());

        if (this.roleNames.includes('ADMIN', 0)) {
          this.isAdmin = true;
          // console.log(this.isAdmin);
        } else {
          this.isAdmin = false;
          // console.log(this.isAdmin);
        }
      });
  }
  save(): void {
    this.saving = true;
    this.isLoading = true;
    // this.user.roleNames = this.getCheckedRoles();
    // this.user.userModes = this.selectedModes;
    this._userService
      .update(this.user)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));

      });
  }

}
