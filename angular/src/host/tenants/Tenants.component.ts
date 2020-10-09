import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { TenantDto, TenantDtoPagedResultDto, TenantServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

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
    private _modalService: BsModalService
  ) {
    super(injector);
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
    throw new Error('Method not implemented.');
  }

}
