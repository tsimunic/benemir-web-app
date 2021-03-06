import { Component, OnInit, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import 'lazysizes';
import { SeoService } from 'src/app/services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute
    ) { }

  @ViewChild('samostan', { read: DragScrollComponent }) samostan: DragScrollComponent;
  @ViewChild('samostanUnutra', { read: DragScrollComponent }) samostanUnutra: DragScrollComponent;


  moveLeftSamostan() {
    this.samostan.moveLeft();
  }

  moveRightSamostan() {
    this.samostan.moveRight();
  }

  moveLeftSamostanUnutra() {
    this.samostanUnutra.moveLeft();
  }

  moveRightSamostanUnutra() {
    this.samostanUnutra.moveRight();
  }


  ngAfterViewInit() {
    // Starting ngx-drag-scroll from specified index(3)
    setTimeout(() => {
      this.samostan.moveTo(0);
    }, 0);
    setTimeout(() => {
      this.samostanUnutra.moveTo(0);
    }, 0);
  }

  ngOnInit() {
    const { meta } = this.route.snapshot.data;
    this.seoService.updateTitle(meta.title);
    this.seoService.updateDescription(meta.description);
  }

}
