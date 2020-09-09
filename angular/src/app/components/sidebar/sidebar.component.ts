import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/app/home', title: 'Dashboard', icon: 'design_app', class: '' },
  { path: '/app/users', title: 'Users', icon: 'users_single-02', class: '' },
  { path: '/app/modes', title: 'Modes', icon: 'location_map-big', class: '' },
  { path: '/app/help', title: 'Help', icon: 'ui-1_bell-53', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}
