import { Router } from '@angular/router';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketServiceProxy, TicketStatus } from './../../../shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { Component, OnInit, Injector } from '@angular/core';
import { TicketListDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { EditTenantComponent } from 'host/tenants/edit-tenant/edit-tenant.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
export class PagedTicketRequestDto extends PagedRequestDto {
  keyword: string;
  status: TicketStatus | null;
  userId: number | null;
  tenantId: number | null;
}
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  providers: [TicketServiceProxy]
})
export class TicketsComponent extends PagedListingComponentBase<TicketListDto>  {
  p = 1;
  isLoading = false;
  keyword = '';
  stage: string | null;
  userId: number |  null;
  status: TicketStatus | null;
  tickets: TicketListDto[] = [];
  constructor(
    injector: Injector,
    private _ticketService: TicketServiceProxy,
    private _modalService: BsModalService,
    private _router: Router
  ) {
    super(injector);
  }
  createTicket() {
    this.showCreateOrEditTicketDialog();
  }
  viewTicket(id: string) {
    this._router.navigate(['app/help/tickets/', id]);
  }
  editTicket(ticket: TicketListDto) {
    this.showCreateOrEditTicketDialog(ticket);
  }
  protected list(request: PagedTicketRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.isLoading = true;
    request.keyword = this.keyword;
    request.status = this.status;
    request.userId = this.userId;
    this._ticketService.getTickets(request.keyword, request.status, request.status,
      this.appSession.tenantId, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
          this.isLoading = false;
        })
      )
      .subscribe((result) => {
        this.tickets = result.items;
        this.totalItems = result.totalCount;
        this.showPaging(result, pageNumber);
      });
  }
  protected delete(entity: TicketListDto): void {
    abp.message.confirm(
      'You want to Delete ' + entity.subject + ' ticket?', '',
      (result: boolean) => {
        if (result) {
          this._ticketService.delete(entity.id)
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
  private showCreateOrEditTicketDialog(ticket?: TicketListDto): void {
    let createOrEditUserDialog: BsModalRef;
    if (!ticket) {
      createOrEditUserDialog = this._modalService.show(
        NewTicketComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditTicketComponent,
        {
          class: 'modal-lg',
          initialState: {
            ticket,
          },
        }
      );
    }

    createOrEditUserDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }


}
