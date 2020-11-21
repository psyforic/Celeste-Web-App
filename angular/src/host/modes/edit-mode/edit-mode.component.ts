import { GetModeOutput } from './../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from 'shared/app-component-base';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { CreateModeInput, ModeServiceProxy, ModeListDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent extends AppComponentBase implements OnInit {
  currentOrientation = 'horizontal';
  mode = new ModeListDto();
  saving = false;
  isLoading = false;
  id: string;
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    public _ModeService: ModeServiceProxy
  ) {
    super(injector);
  }
  ngOnInit() {
    if (this.bsModalRef.content && this.bsModalRef.content.id) {
      this.mode = this.bsModalRef.content.mode;
    }
  }
  save(): void {
    this.saving = true;
    this.isLoading = true;
    this._ModeService
      .update(this.mode as GetModeOutput)
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
