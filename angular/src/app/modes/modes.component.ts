import { AppComponentBase } from '@shared/app-component-base';
import { AbpSessionService } from 'abp-ng2-module';
import { AssignModeComponent } from './assign-mode/assign-mode.component';
import { EditModeDialogComponent } from './edit-mode/edit-mode-dialog.component';
import { ModeListDto, ModeServiceProxy, IsTenantAvailableInput, UserServiceProxy, UserDto, GetCurrentLoginInformationsOutput, GetRoleForEditOutput, RoleDto } from './../../shared/service-proxies/service-proxies';
import { Component, Injector, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finished } from 'stream';


class PagedModesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-modes',
  templateUrl: './modes.component.html',
  styleUrls: ['./modes.component.css'],
  animations: [appModuleAnimation()],
  providers: [ModeServiceProxy]
})
export class ModesComponent extends PagedListingComponentBase<ModeListDto>{
  p = 1;
  closeResult = '';
  currentOrientation = 'horizontal';
  isLoading = false;
  isAdmin = false;
  modes: ModeListDto[] = [];
  keyword = '';
  users: UserDto[] = [];
  user: UserDto;
  currentUser: number;
  roleNames: any[] = [];

  isActive: boolean | null;
  constructor(
    private _sessionService: AbpSessionService,
    private modalService: NgbModal,
    private _modalService: BsModalService,
    private _userService: UserServiceProxy,
    injector: Injector,
    private _ModeService: ModeServiceProxy
  ) {
    super(injector);
  }
  // ngOnInit() {
  //   this.getUserId();
  // }
  isUserChecked(): any {
    throw new Error('Method not implemented.');
  }
  createMode(): void {
    //   this.showCreateOrEditUserDialog();
  }
  getUserId(userId: number) {
    console.log(userId);
    this._userService
      .get(this.currentUser)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result: UserDto) => {
        this.roleNames = result.roleNames;
        console.log(this.roleNames.toString());
        if (this.roleNames.includes('ADMIN', 0)) {
          this.isAdmin = true;
          console.log(this.isAdmin);
        } else {
          this.isAdmin = false;
          console.log(this.isAdmin);
        }
      });
  }
  editMode(mode: ModeListDto): void {
    this.showCreateOrEditUserDialog(mode.id);
  }
  // tslint:disable-next-line: member-ordering
  delete(entity: ModeListDto): void {
    abp.message.confirm(
      'You want to Delete ' + entity.name + '?', '',
      (result: boolean) => {
        if (result) {
          this._ModeService.delete(entity.id)
            .pipe(finalize(() => {
              this.isLoading = false;
            }))
            .subscribe(() => {
              abp.notify.success('Deleted Successfully');
              this.refresh();
            });
        }
      }
    );
  }

  protected list(
    request: PagedModesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this.isLoading = true;
    request.keyword = this.keyword;
    request.isActive = this.isActive;
    this.currentUser = this._sessionService.userId;
    this.getUserId(this.currentUser);
    this._ModeService.getAll(request.maxResultCount, request.skipCount)
      .pipe(
        finalize(() => {
          finishedCallback();
          this.isLoading = false;
          // console.log(this.currentUser);
        })
      )
      .subscribe((result: any) => {
        this.modes = result.items;
        console.log(this.modes);
        this.showPaging(result, pageNumber);
      });
  }
  private showCreateOrEditUserDialog(id?: any): void {
    let createOrEditUserDialog: BsModalRef;
    if (!id) {
      createOrEditUserDialog = this._modalService.show(
        AssignModeComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        AssignModeComponent,
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
