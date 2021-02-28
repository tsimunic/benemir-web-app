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


  @ViewChild('products', { read: DragScrollComponent }) products: DragScrollComponent;

  moveLeft() {
    this.products.moveLeft();
  }

  moveRight() {
    this.products.moveRight();
  }

  ngAfterViewInit() {
    // Starting ngx-drag-scroll from specified index(3)
    setTimeout(() => {
      this.products.moveTo(0);
    }, 0); 
  }

  ngOnInit() {

  }
  
}
