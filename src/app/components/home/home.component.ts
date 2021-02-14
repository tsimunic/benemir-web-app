import { ChangeDetectorRef, Component, OnInit, ViewChild, } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import 'lazysizes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private changeDetectorRef: ChangeDetectorRef) { }


  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  @ViewChild('torta', { read: DragScrollComponent }) torta: DragScrollComponent;

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveLeftTorta() {
    this.torta.moveLeft();
  }

  moveRightTorta() {
    this.torta.moveRight();
  }

  ngAfterViewInit() {
    // Starting ngx-drag-scroll from specified index(3)
    setTimeout(() => {
      this.ds.moveTo(0);
    }, 0);
    setTimeout(() => {
      this.torta.moveTo(0);
    }, 0);    
  }





  ngOnInit() {

  }


}
