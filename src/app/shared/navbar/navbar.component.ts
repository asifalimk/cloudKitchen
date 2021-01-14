import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'app/auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  location: Location;
  private toggleButton;
  private sidebarVisible: boolean;
  public isCollapsed = true;

  isRootAdmin: boolean;

  @ViewChild("navbar-cmp", { static: false }) button;

  constructor(location: Location, private element: ElementRef, private router: Router, private authService: AuthService) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.isRootAdmin = this.authService.isRootAdmin();
  }

  /**
   * 
   */
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };
  sidebarClose() {
    this.sidebarVisible = false;
  };


  collapse() {

  }

  logout() {
    this.authService.logout();
  }

}
