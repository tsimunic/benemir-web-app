import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const { meta } = this.route.snapshot.data;
    this.seoService.updateTitle(meta.title);
    this.seoService.updateDescription(meta.description);
  }

}
