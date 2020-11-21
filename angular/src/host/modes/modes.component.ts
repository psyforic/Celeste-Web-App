import { TopNavTitleService } from './../../shared/services/top-nav-title.service';
import { EditModeComponent } from './edit-mode/edit-mode.component';
import { NewModeComponent } from './new-mode/new-mode.component';
import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { ModeListDto, ModeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';


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
  isActive = false;
  modes: ModeListDto[] = [];
  keyword = '';

  constructor(
    private _ModeService: ModeServiceProxy,
    private _topNavTitleService: TopNavTitleService,
    private _modalService: BsModalService,
    injector: Injector,
  ) {
    super(injector);
    this._topNavTitleService.setTitle('Modes');
  }
  createMode(): void {
     this.showCreateOrEditModeDialog();
  }
  editMode(mode: ModeListDto): void {
    this.showCreateOrEditModeDialog(mode);
  }
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
    p: number,
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
        this.showPaging(result, p);
      });
  }
  private showCreateOrEditModeDialog(mode?: ModeListDto): void {
    let createOrEditUserDialog: BsModalRef;
    if (!mode) {
      createOrEditUserDialog = this._modalService.show(
        NewModeComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditModeComponent,
        {
          class: 'modal-lg',
          initialState: {
            mode,
          },
        }
      );
    }

    createOrEditUserDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

}
