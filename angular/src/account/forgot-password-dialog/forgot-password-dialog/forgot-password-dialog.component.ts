import { AppComponentBase } from '@shared/app-component-base';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent extends AppComponentBase implements OnInit {
  @ViewChild('forgotPasswordModal', { static: false }) modal: ModalDirective;
  // @ViewChild('modalContent', { static: false }) nameInput: ElementRef;
  constructor( private injector: Injector,
    private bsModalRef: BsModalRef)
  {
    super(injector);
   }

  ngOnInit(){

  }
  refresh() { }
}
