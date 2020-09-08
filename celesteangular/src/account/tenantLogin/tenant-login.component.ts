import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tenantLogin',
  templateUrl: './tenant-login.component.html',
  styleUrls: ['./tenant-login.component.scss']
})
export class TenantLoginComponent implements OnInit {

  constructor(
    injector: Injector,
    private _router: Router
  ) {
       // super(injector);
  }

  ngOnInit() {
  }
  login() {
    this._router.navigate(['account/login']);
  }

}
