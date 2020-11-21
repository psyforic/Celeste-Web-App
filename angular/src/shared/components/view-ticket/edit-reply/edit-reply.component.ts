import { BsModalRef } from 'ngx-bootstrap/modal';
import { TicketReplyListDto, TicketReplyServiceProxy, TicketStatus } from './../../../service-proxies/service-proxies';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { Component, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.scss'],
  providers: [TicketReplyServiceProxy]
})
export class EditReplyComponent extends AppComponentBase implements OnInit {
  saving = false;
  ticketReply: TicketReplyListDto = new TicketReplyListDto();
  id: string;
  @Output() onSave = new EventEmitter<any>();
  status = 1;
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _ticketReplyService: TicketReplyServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.bsModalRef.content && this.bsModalRef.content.id) {
      this.ticketReply = this.bsModalRef.content.ticketReply;
    }
  }
  save() {
    this.ticketReply.ticketStatus = this.status;
    this._ticketReplyService.update(this.ticketReply)
    .pipe(finalize(() => {

    })).subscribe(() => {
      this.notify.success('Saved Successfully');
      this.bsModalRef.hide();
      this.onSave.emit();
    });
  }
}
