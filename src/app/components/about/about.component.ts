import { ChangeDetectorRef, Component, OnInit, ViewChild, } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import 'lazysizes';
import { SeoService } from 'src/app/services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute
  ) { }


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
    const { meta } = this.route.snapshot.data;
    this.seoService.updateTitle(meta.title);
    this.seoService.updateDescription(meta.description);
  }


}
