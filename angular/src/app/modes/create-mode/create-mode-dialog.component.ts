import { PagedListingComponentBase, PagedRequestDto } from './../../../shared/paged-listing-component-base';
import { ModeListDto, UserModeListDto, ModeServiceProxy, CreateModeInput } from './../../../shared/service-proxies/service-proxies';
import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';

class PagedModesRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
  }

  @Component({
    templateUrl: './create-mode-dialog.component.html',
    providers: [ModeServiceProxy]
  })
  export class CreateModeDialogComponent extends PagedListingComponentBase<ModeListDto> {

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



      protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
      }
      protected delete(entity: ModeListDto): void {
      }

  }
