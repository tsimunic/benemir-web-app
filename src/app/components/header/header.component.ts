import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { MatDialog } from '@angular/material';
import { LanguageDialogComponent } from '../dialogs/language-dialog/language-dialog.component';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {


  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    public dialog: MatDialog,
    public translate: TranslateService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart && this.hamburgerActivated == true) {
        this.activateHamburger();
      }
    });
  }

  hamburgerActivated = false;
  dropdownDisplay = 'none';

  @ViewChild('stickyHeader', { static: false }) stickyHeader: ElementRef;

  stickyPosition;
  headerPlaceholderPosition;
  positionTop;
  calculatedHeight = '0px';
  currentLanguage = 'hr';

  ngOnInit() {
    if (localStorage.getItem("language") === null) {
      this.translate.setDefaultLang('hr');
      this.translate.use('hr');
      localStorage.setItem("language", "hr")
    } else {
      this.currentLanguage = localStorage.getItem("language");
      this.translate.setDefaultLang(localStorage.getItem("language"));
      this.translate.use(localStorage.getItem("language"));
    }
  }

  routeHome() {
    this.router.navigate(['/home']);
  }

  ngAfterViewInit() {
    this.stickyPosition = this.stickyHeader.nativeElement.getBoundingClientRect().top;
    this.headerPlaceholderPosition = this.stickyHeader.nativeElement.getBoundingClientRect().bottom;
    this.sidebarService.setScreenWidth(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sidebarService.setScreenWidth(window.innerWidth);
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    this.stickyHeaderFunction();
  }

  stickyHeaderFunction() {

    if (window.pageYOffset > this.stickyPosition) {
      this.stickyHeader.nativeElement.classList.add('sticky');
      this.calculatedHeight = this.headerPlaceholderPosition - this.stickyPosition + 'px';
    } else {
      this.stickyHeader.nativeElement.classList.remove('sticky');
      this.calculatedHeight = 'auto';
    }
    if (this.calculatedHeight !== this.sidebarService.getBottomHeaderPosition()) {
      this.sidebarService.setBottomHeaderPosition(this.calculatedHeight);
    }
  }

  activateHamburger() {
    this.sidebarService.changeSidebarStatus();
    this.hamburgerActivated = this.sidebarService.getSidebarStatus();
  }

  async openLanguageDialog() {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    const dialogRef = this.dialog.open(LanguageDialogComponent, {
      width: '250px',
      height: '400px',
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.currentLanguage = result;
        this.translate.use(result);
        localStorage.setItem("language", result);
      }
      document.body.style.overflow = 'auto';
    });

  }
}
