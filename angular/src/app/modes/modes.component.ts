import { ModeListDto, ModeServiceProxy } from './../../shared/service-proxies/service-proxies';
import { Component, Injector } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';


class PagedModesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-modes',
  templateUrl: './modes.component.html',
  styleUrls: ['./modes.component.css'],
  providers: [ModeServiceProxy]
})
export class ModesComponent extends PagedListingComponentBase<ModeListDto> {
    closeResult = '';
  currentOrientation = 'horizontal';
  isLoading: boolean;
  modes: ModeListDto[] = [];
  keyword = '';
  isActive: boolean | null;
  constructor(
    private modalService: NgbModal,
    injector: Injector,
    private _ModeService: ModeServiceProxy
    ) {
      super(injector);
    }


// tslint:disable-next-line: member-ordering
protected delete(entity: ModeListDto): void {
  abp.message.confirm(
      'You want to Delete ' + entity.name + '?', '',
      (result: boolean) => {
          if (result) {
              this._ModeService.delete(entity.id)
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

protected list(
  request: PagedModesRequestDto,
  pageNumber: number,
  finishedCallback: Function
): void {

  console.log(this.modes);
  request.keyword = this.keyword;
  request.isActive = this.isActive;

  this._ModeService.getAll(request.maxResultCount, request.skipCount)
        .pipe(
            finalize(() => {
                finishedCallback();
                this.isLoading = false;
            })
        )
    .subscribe((result: any) => {
      this.modes = result.items;
      console.log(this.modes);
      this.showPaging(result, pageNumber);
    });
}


}
// export class ModesComponent extends PagedListingComponentBase<ModeListDto> {
//   closeResult = '';
//   currentOrientation = 'horizontal';
//   isLoading: boolean;
//   modes: ModeListDto[] = [];
//   keyword = '';
//   isActive: boolean | null;
//   constructor(
//     private modalService: NgbModal,
//     injector: Injector,
//     private _ModeService: ModeServiceProxy
//     ) {
//       super(injector);
//     }

//   ngOnInit(): void {
//   }

//   open(content) {
//     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
//       this.closeResult = `Closed with: ${result}`;
//     }, (reason) => {
//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//     });
//   }


// protected list(
//   request: PagedModesRequestDto,
//   pageNumber: number,
//   finishedCallback: Function
// ): void {

//   console.log(this.modes);
//   request.keyword = this.keyword;
//   request.isActive = this.isActive;

//   this._ModeService.getAll(request.maxResultCount, request.skipCount)
//         .pipe(
//             finalize(() => {
//                 finishedCallback();
//                 this.isLoading = false;
//             })
//         )
//     .subscribe((result: any) => {
//       this.modes = result.items;
//       this.showPaging(result, pageNumber);
//     });
// }
// protected delete(entity: ModeListDto): void {
//   abp.message.confirm(
//       'You want to Delete ' + entity.name + '?', '',
//       (result: boolean) => {
//           if (result) {
//               this._ModeService.delete(entity.id)
//                   .pipe(finalize(() => {
//                       this.isLoading = false;
//                   }))
//                   .subscribe(() => {
//                       abp.notify.success('Deleted Successfully');
//                       this.refresh();
//                   });
//           }
//       }
//   );
// }

//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return `with: ${reason}`;
//     }
//   }

// }
