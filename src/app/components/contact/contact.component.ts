import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import XyzSource from 'ol/source/XYZ';
import { style } from '@angular/animations';
import { SeoService } from 'src/app/services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute
  ) { }

  map: Map;
  vectorSource: VectorSource;
  vectorLayer: VectorLayer;
  marker: Feature;
  xyzSource: XyzSource;
  tileLayer: TileLayer;
  view: View;
  ;

  ngOnInit() {
    const { meta } = this.route.snapshot.data;
    this.seoService.updateTitle(meta.title);
    this.seoService.updateDescription(meta.description);
    var iconStyle = new Style({
      image: new Icon({
        anchor: [14.761123428425517, 44.754862592821354],
        src: 'assets/images/pointer.svg',
      }),
    });

    this.marker = new Feature({
      geometry: new Point(olProj.fromLonLat([14.761123428425517, 44.754862592821354]))
    });
    this.marker.setStyle(iconStyle)

    this.vectorSource = new VectorSource({
      features: [this.marker]
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    // XYZ
    this.xyzSource = new XyzSource({
      url: 'https://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.tileLayer = new TileLayer({
      source: this.xyzSource
    });

    this.view = new View({
      center: olProj.fromLonLat([14.76057, 44.75478]),
      zoom: 18
    });
    style;
    this.map = new Map({
      target: 'benemir_map',
      layers: [this.tileLayer, this.vectorLayer],
      view: this.view
    });

  }

}
