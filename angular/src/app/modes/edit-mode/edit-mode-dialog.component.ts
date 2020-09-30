import { ModeListDto, ModeServiceProxy } from './../../../shared/service-proxies/service-proxies';
import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output
  } from '@angular/core';
  import { AppComponentBase } from './../../../shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';

@Component({
    templateUrl: './edit-mode-dialog.component.html',
    providers: [ModeServiceProxy]
  })
  export class EditModeDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  isLoading = false;
  mode = new ModeListDto();
  id: any;

  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public _modeService: ModeServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
    ngOnInit(): void {
        this._modeService.get(this.id).subscribe((result) => {
            this.mode = result;
          });
    }
    save(): void {
        this.saving = true;
        this.isLoading = true;
        this._modeService
          .update(this.mode)
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
