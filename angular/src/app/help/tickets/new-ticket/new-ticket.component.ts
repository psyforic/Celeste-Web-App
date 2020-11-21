import { CreateTicketInput, TicketServiceProxy } from './../../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss'],
  providers: [TicketServiceProxy]
})
export class NewTicketComponent extends AppComponentBase implements OnInit {
  isLoading = false;
  saving = false;
  ticket: CreateTicketInput = new CreateTicketInput();
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    private _ticketService: TicketServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
   }

  ngOnInit() {
  }

  save() {
    this.saving = true;
    this._ticketService.create(this.ticket)
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
