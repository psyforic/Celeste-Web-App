import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  UserServiceProxy,
  UserDto,
  UserDtoPagedResultDto,
  CreateUserDto
} from '@shared/service-proxies/service-proxies';
import { CreateUserDialogComponent } from './create-user/create-user-dialog.component';
import { EditUserDialogComponent } from './edit-user/edit-user-dialog.component';
import { ResetPasswordDialogComponent } from './reset-password/reset-password.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './users.component.html',
  animations: [appModuleAnimation()]
})
export class UsersComponent extends PagedListingComponentBase<UserDto> {
    frm_create_user: FormGroup;
    isLoading = false;
    active = false;
    saving = false;
  users: UserDto[] = [];
  user: CreateUserDto = null;
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;
  closeResult = '';
  currentOrientation = 'horizontal';

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private _modalService: BsModalService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    super(injector);
  }

  open(content) {
    this.user = new CreateUserDto();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  save(): void {
    this.isLoading = true;
    this.user = Object.assign({}, this.frm_create_user.value);
    this.user.password = '123qwe';
    this.saving = true;
    this._userService.create(this.user)
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
  initializeForm() {
    this.frm_create_user = this.fb.group({
        userName: ['', Validators.required],
        fullName: ['', Validators.required],
        emailAddress: ['', Validators.required],
        cellphoneNumber: ['', Validators.required],
        address: ['', Validators.required],
        suburb: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        province: ['', Validators.required],
    });
}
  // tslint:disable-next-line: member-ordering
  createUser(): void {
    this.showCreateOrEditUserDialog();
  }

  editUser(user: UserDto): void {
    this.showCreateOrEditUserDialog(user.id);
  }
  // tslint:disable-next-line: member-ordering
  protected delete(user: UserDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', user.fullName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._userService.delete(user.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
  protected list(
    request: PagedUsersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

    request.keyword = this.keyword;
    request.isActive = this.isActive;
    this.isLoading = true;
    this._userService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
          this.isLoading = false;
        })
      )
      .subscribe((result: UserDtoPagedResultDto) => {
        console.log(this.users);
        this.users = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




  private showResetPasswordUserDialog(id?: number): void {
    this._modalService.show(ResetPasswordDialogComponent, {
      class: 'modal-lg',
      initialState: {
        id: id,
      },
    });
  }

  private showCreateOrEditUserDialog(id?: number): void {
    let createOrEditUserDialog: BsModalRef;
    if (!id) {
      createOrEditUserDialog = this._modalService.show(
        CreateUserDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditUserDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditUserDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }


}
