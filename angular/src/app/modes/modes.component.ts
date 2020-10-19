import { AssignModeComponent } from './assign-mode/assign-mode.component';
import { EditModeDialogComponent } from './edit-mode/edit-mode-dialog.component';
import { ModeListDto, ModeServiceProxy, IsTenantAvailableInput } from './../../shared/service-proxies/service-proxies';
import { Component, Injector } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';


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
export class ModesComponent extends PagedListingComponentBase<ModeListDto> {
  p: number = 1;
  closeResult = '';
  currentOrientation = 'horizontal';
  isLoading = false;
  modes: ModeListDto[] = [];
  keyword = '';
  isActive: boolean | null;
  constructor(
    private modalService: NgbModal,
    private _modalService: BsModalService,
    injector: Injector,
    private _ModeService: ModeServiceProxy
  ) {
    super(injector);
  }

  createMode(): void {
    this.showCreateOrEditUserDialog();
  }

  editMode(mode: ModeListDto): void {
    this.showCreateOrEditUserDialog(mode.id);
  }
  // tslint:disable-next-line: member-ordering
  protected delete(entity: ModeListDto): void {
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
