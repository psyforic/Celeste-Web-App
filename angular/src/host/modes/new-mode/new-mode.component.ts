import { AppComponentBase } from '@shared/app-component-base';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { CreateModeInput, ModeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-new-mode',
  templateUrl: './new-mode.component.html',
  styleUrls: ['./new-mode.component.scss']
})
export class NewModeComponent extends AppComponentBase implements OnInit {
  currentOrientation = 'horizontal';
  mode = new CreateModeInput();
  saving = false;
  isLoading = false;
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    public _ModeService: ModeServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
  }
  save(): void {
    this.saving = true;
    this.isLoading = true;
    console.log(this.mode);
    this._ModeService
      .create(this.mode)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }

}
