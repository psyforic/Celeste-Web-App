import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-tenant-success',
  templateUrl: './register-tenant-success.component.html',
  styleUrls: ['./register-tenant-success.component.css']
})
export class RegisterTenantSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  login() {
    location.href = '../login';
  }
}
