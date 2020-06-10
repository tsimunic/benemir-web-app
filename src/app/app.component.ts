import { Component, ViewChild, ElementRef, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';

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

  constructor(
    private sidebarService: SidebarService
  ) { }

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
