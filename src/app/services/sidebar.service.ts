import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  private bottomHeaderPosition = new BehaviorSubject('auto');
  private screenWidth = new BehaviorSubject('0px');
  private sidebarStatus = new BehaviorSubject(false);
  currentBottomHeaderPosition = this.bottomHeaderPosition.asObservable();
  currentSidebarStatus = this.sidebarStatus.asObservable();
  currentScreenWidth = this.sidebarStatus.asObservable();


  setBottomHeaderPosition(newPosition) {
    this.bottomHeaderPosition.next(newPosition);
  }

  getBottomHeaderPosition() {
    return this.bottomHeaderPosition.getValue();
  }

  changeSidebarStatus() {
    this.sidebarStatus.next(!this.getSidebarStatus());
  }

  getSidebarStatus() {
    return this.sidebarStatus.getValue();
  }

  setScreenWidth(newPosition) {
    newPosition = newPosition.toString() + 'px';
    this.screenWidth.next(newPosition);
  }

  getScreenWidth() {
    return this.screenWidth.getValue();
  }

}
