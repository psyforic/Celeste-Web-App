import { TopNavTitleService } from './../../../shared/services/top-nav-title.service';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, OnInit, ElementRef, Injector } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  selector: 'host-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends AppComponentBase implements OnInit {
  user: UserDto = new UserDto();
  private listTitles: any[];
  title: string;
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  public isCollapsed = true;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    injector: Injector,
    private _topNavTitleService: TopNavTitleService,
    private _authService: AppAuthService,
    private _userService: UserServiceProxy,

  ) {
    super(injector);
    this.location = location;
    this.sidebarVisible = false;
    this._topNavTitleService.getTitle().subscribe(appTitle => this.title = appTitle.toString());
  }
  ngOnInit() {
    // this.listTitles = ROUTES.filter(listTitle => listTitle);
    // const navbar: HTMLElement = this.element.nativeElement;
    // this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    // this.router.events.subscribe((event) => {
    //   this.sidebarClose();
    //   var $layer: any = document.getElementsByClassName('close-layer')[0];
    //   if ($layer) {
    //     $layer.remove();
    //     this.mobile_menu_visible = 0;
    //   }
    // });
  }
  logout(): void {
    this._authService.logout();
  }

  getUser() {
    const id = this.appSession.userId;
    this._userService.get(id).subscribe((result) => {
      this.user = result;
    });

  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];

    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName('html')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (html.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (html.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () { //asign a function
        html.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      html.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    return this._topNavTitleService.getTitle().subscribe();
  }
}
