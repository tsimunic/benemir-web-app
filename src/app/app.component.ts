import { Component, ViewChild, ElementRef, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
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
  firstPageOpen = true;
  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    translate: TranslateService
  ) {
    translate.setDefaultLang('hr');
    translate.use('hr');
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
    if (this.firstPageOpen && localStorage.getItem("firstPageOpen") !== "1") {
      this.firstPageOpen = false;
      localStorage.setItem("firstPageOpen", "1");
      let snackBarRef = this._snackBar.open('Korištenjem ovih web stranica slažeš se sa upotrebom kolačića (cookies).', 'x', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    }
    
    /* this.sidebarService.currentBottomHeaderPosition.subscribe(position => {
      console.log(position.substring(0, position.length - 2));
      if (position === 'auto') {
        console.log(position);
        document.getElementById('mySidenav').style.top = position;
      } else {
        this.componentTop = this.belowHeader.nativeElement.getBoundingClientRect().top;
        console.log(this.initialTopPosition, +position.substring(0, position.length - 2), this.componentTop);
        let newSidebarPosition = this.initialTopPosition + +position.substring(0, position.length - 2) - this.componentTop;
        console.log(newSidebarPosition);
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
