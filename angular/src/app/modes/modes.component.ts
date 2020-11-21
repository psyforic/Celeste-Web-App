import { TopNavTitleService } from './../../shared/services/top-nav-title.service';
import { AppComponentBase } from '@shared/app-component-base';
import { AbpSessionService } from 'abp-ng2-module';
import { AssignModeComponent } from './assign-mode/assign-mode.component';
import { EditModeDialogComponent } from './edit-mode/edit-mode-dialog.component';
import {
  ModeListDto, ModeServiceProxy, IsTenantAvailableInput, UserServiceProxy, UserDto,
  GetCurrentLoginInformationsOutput, GetRoleForEditOutput, RoleDto
} from './../../shared/service-proxies/service-proxies';
import { Component, Injector, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize, filter } from 'rxjs/operators';
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
  modesResults: ModeListDto[] = [];
  keyword = '';
  users: UserDto[] = [];
  user: UserDto;
  currentUser: number;
  roleNames: any[] = [];

  isActive: boolean | null;
  constructor(
    private _sessionService: AbpSessionService,
    private _modalService: BsModalService,
    private _userService: UserServiceProxy,
    private __topNavTitleService: TopNavTitleService,
    injector: Injector,
    private _ModeService: ModeServiceProxy
  ) {
    super(injector);
    this.__topNavTitleService.setTitle('Modes');
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
        // console.log(this.roleNames.toString());

        if (this.roleNames.includes('ADMIN', 0)) {
          this.isAdmin = true;
          // console.log(this.isAdmin);
        } else {
          this.isAdmin = false;
          // console.log(this.isAdmin);
        }
        if (!this.isAdmin) {
          this.modes = this.modesResults.filter(x => this.user.userModes != null &&
            this.user.userModes.filter(mode => mode.modeId === x.id).length > 0);
        } else {
          this.modes = this.modesResults;
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

    this._ModeService.getAll(request.maxResultCount, request.skipCount)
      .pipe(
        finalize(() => {
          finishedCallback();
          this.isLoading = false;
          // console.log(this.currentUser);
        })
      )
      .subscribe((result) => {

        this.getUser(this.currentUser);
        this.modesResults = result.items;
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
