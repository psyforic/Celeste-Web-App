import { TopNavTitleService } from './../../shared/services/top-nav-title.service';
import { EditTenantComponent } from './edit-tenant/edit-tenant.component';
import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { TenantDto, TenantDtoPagedResultDto, TenantServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateTenantComponent } from './create-tenant/create-tenant-dialog.component';

class PagedTenantsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}
@Component({
  selector: 'host-tenants',
  templateUrl: './Tenants.component.html',
  styleUrls: ['./Tenants.component.css']
})
export class TenantsComponent extends PagedListingComponentBase<TenantDto> {
  p: number = 1;
  tenants: TenantDto[] = [];
  keyword = '';
  isActive: boolean | null;
  isLoading = false;
  advancedFiltersVisible = false;
  constructor(
    injector: Injector,
    private _tenantService: TenantServiceProxy,
    private _topNavTitleService: TopNavTitleService,
    private _modalService: BsModalService
  ) {
    super(injector);
    this._topNavTitleService.setTitle('Tenants');
  }
  createTenant(): void {
    this.showCreateOrEditTenantDialog();
  }

  editTenant(tenant: TenantDto): void {
    this.showCreateOrEditTenantDialog(tenant.id);
  }
  list(
    request: PagedTenantsRequestDto,
    p: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;
    this.isLoading = true;
    this._tenantService
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
      .subscribe((result: TenantDtoPagedResultDto) => {
        this.tenants = result.items;
        this.showPaging(result, p);
      });
  }
  protected delete(entity: TenantDto): void {
    abp.message.confirm(
      'You want to Delete ' + entity.name + '?', '',
      (result: boolean) => {
        if (result) {
          this._tenantService.delete(entity.id)
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
  private showCreateOrEditTenantDialog(id?: number): void {
    let createOrEditTenantDialog: BsModalRef;
    if (!id) {
      createOrEditTenantDialog = this._modalService.show(
        CreateTenantComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditTenantDialog = this._modalService.show(
        EditTenantComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditTenantDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

}
