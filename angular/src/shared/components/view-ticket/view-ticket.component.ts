import { EditReplyComponent } from './edit-reply/edit-reply.component';
import { TicketReplyServiceProxy, CreateTicketReplyInput, TicketReplyListDto, TicketStatus } from './../../service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { TicketServiceProxy, TicketListDto } from '../../service-proxies/service-proxies';
import { AppComponentBase } from '../../app-component-base';
import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditTicketComponent } from '@app/help/tickets/edit-ticket/edit-ticket.component';
@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss'],
  providers: [TicketServiceProxy, TicketReplyServiceProxy]
})
export class ViewTicketComponent extends AppComponentBase implements OnInit {
  isLoading = false;
  saving = false;
  ticket: TicketListDto = new TicketListDto();
  id: string;
  newReply: CreateTicketReplyInput;
  isReplying = false;
  link: string;
  constructor(
    injector: Injector,
    private _activatedRoute: ActivatedRoute,
    private _ticketService: TicketServiceProxy,
    private _ticketReplyService: TicketReplyServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
    this.id = this._activatedRoute.snapshot.params.id;
    if(this.appSession.tenantId) {
      this.link = '/app/help/tickets';
    } else {
      this.link = '/host/tickets';
    }
  }


  ngOnInit() {
    this.isLoading = true;
    this.get(this.id);
  }
  addReply() {
    this.isReplying = true;
    if (this.isReplying) {
      if (!this.newReply) {
        this.newReply = new CreateTicketReplyInput();
      }
    }
  }
  get(id: string) {
    this._ticketService.get(this.id)
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(result => {
        this.ticket = result;
      });
  }
  editReply(ticketReply: TicketReplyListDto) {
    this.showCreateOrEditTicketReplyDialog(ticketReply);
  }
  editTicket(ticket: TicketListDto) {
    this.showCreateOrEditTicketDialog(ticket);
  }
  save() {
    this.saving = true;
    this.newReply.ticketId = this.id;
    this.newReply.tenantId = this.ticket.tenantId;
    this.newReply.ticketStatus = this.appSession.tenantId ? 0 : 1;
    this._ticketReplyService.create(this.newReply)
      .pipe(finalize(() => {
        this.saving = false;
      })).subscribe(() => {
        this.notify.success('Saved Successfully');
        this.isReplying = false;
        this.get(this.id);
      }, () => {
        this.notify.error('An Error Occurred');
      });
  }
  private showCreateOrEditTicketReplyDialog(ticketReply?: TicketReplyListDto): void {
    let createOrEditTicketReplyDialog: BsModalRef;
    if (ticketReply) {
      createOrEditTicketReplyDialog = this._modalService.show(
        EditReplyComponent,
        {
          class: 'modal-lg',
          initialState: {
            ticketReply,
          },
        }
      );
    }

    createOrEditTicketReplyDialog.content.onSave.subscribe(() => {
      this.get(this.id);
    });
  }
  private showCreateOrEditTicketDialog(ticket?: TicketListDto): void {
    let createOrEditTicketDialog: BsModalRef;
    if (ticket) {
      createOrEditTicketDialog = this._modalService.show(
        EditTicketComponent,
        {
          class: 'modal-lg',
          initialState: {
            ticket,
          },
        }
      );
    }

    createOrEditTicketDialog.content.onSave.subscribe(() => {
      this.get(this.id);
    });
  }

}
