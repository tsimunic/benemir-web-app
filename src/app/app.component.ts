import { Component, ViewChild, ElementRef, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'web';
  initialTopPosition;
  relativeTopPosition;
  componentTop;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  showSnackbar = true;
  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    
   }

  @ViewChild('stickyHeaderApp', { static: false }) stickyHeader: ElementRef;
  @ViewChild('belowHeader', { static: false }) belowHeader: ElementRef;


  ngOnInit() {

    this.sidebarService.currentSidebarStatus.subscribe(status => {
      if (status === true) {
        this.openNav();
      } else {
        this.closeNav();
      }
    });
    
    if (localStorage.getItem("showSnackbar") !== "1") {
      let snackBarRef = this.snackBar.open('Korištenjem ovih web stranica slažeš se sa upotrebom kolačića (cookies).', 'x', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
      snackBarRef.onAction().subscribe(() => {
        localStorage.setItem("showSnackbar", "1");
      });
    }
    
    /* this.sidebarService.currentBottomHeaderPosition.subscribe(position => {
      if (position === 'auto') {
        document.getElementById('mySidenav').style.top = position;
      } else {
        this.componentTop = this.belowHeader.nativeElement.getBoundingClientRect().top;
        let newSidebarPosition = this.initialTopPosition + +position.substring(0, position.length - 2) - this.componentTop;
        document.getElementById('mySidenav').style.top = (newSidebarPosition + 'px');
      }
    }); */
  }

  closeSidebarOnNavToCurrent(buttonInfo) {
    if (buttonInfo === this.router.url) {
      this.sidebarService.changeSidebarStatus();
    }
  }

  ngAfterViewInit() {
    this.initialTopPosition = this.belowHeader.nativeElement.getBoundingClientRect().top;
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    this.setComponentTop();
  }

  setComponentTop() {
    this.componentTop = this.belowHeader.nativeElement.getBoundingClientRect().top;
    const currentBottomHeaderPosition = this.sidebarService.getBottomHeaderPosition();
    if (currentBottomHeaderPosition === 'auto') {
      document.getElementById('mySidenav').style.top = currentBottomHeaderPosition;
    } else {
      const newSidebarPosition = this.initialTopPosition +
        +currentBottomHeaderPosition.substring(0, currentBottomHeaderPosition.length - 2) - this.componentTop;
      document.getElementById('mySidenav').style.top = (newSidebarPosition + 'px');
    }
  }

  openNav() {
    document.getElementById('mySidenav').style.width = this.sidebarService.getScreenWidth();
    document.body.style.overflow = 'hidden';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.body.style.overflow = 'auto';
  }

}
