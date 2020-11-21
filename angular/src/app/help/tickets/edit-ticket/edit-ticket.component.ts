import { AppComponentBase } from '@shared/app-component-base';
import { TicketListDto, TicketServiceProxy, TicketDto } from './../../../../shared/service-proxies/service-proxies';
import { Component, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
  providers: [TicketServiceProxy]
})
export class EditTicketComponent extends AppComponentBase implements OnInit {
  saving = false;
  ticket: TicketListDto = new TicketListDto();
  id: string;
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    private _ticketService: TicketServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);

  }

  ngOnInit() {
    if (this.bsModalRef.content && this.bsModalRef.content.id) {
      this.ticket = this.bsModalRef.content.ticket;
    }
  }
  save() {
    this.saving = true;
    this.saving = true;
    const ticket = new TicketDto();
    ticket.id = this.ticket.id;
    ticket.subject = this.ticket.subject;
    ticket.body = this.ticket.body;
    this._ticketService.update(ticket)
    .pipe(finalize(() => {
      this.saving = false;
    })).subscribe(() => {
      this.notify.success('Saved Successfully');
      this.bsModalRef.hide();
      this.onSave.emit();
    }, () => {
      this.notify.error('An Error Occurred');
    });
  }
}
