import { ChangeDetectorRef, Component, OnInit, ViewChild, } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import 'lazysizes';
import { SeoService } from 'src/app/services/seo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute
    ) { }

  buttonColor = 'transparent';

  @ViewChild('products', { read: DragScrollComponent }) products: DragScrollComponent;

  scrollToContent() {
    window.scroll({
      top: 800,
      left: 0,
      behavior: 'smooth'
    });
  }

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
    const { meta } = this.route.snapshot.data;
    this.seoService.updateTitle(meta.title);
    this.seoService.updateDescription(meta.description);
  }

}
