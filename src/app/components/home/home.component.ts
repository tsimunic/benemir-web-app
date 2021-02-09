import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  images = [
    {
      path: '../../../assets/images/samostan.jpg'
    },
    {
      path: '../../../assets/images/benemir.PNG'
    },
    {
      path: '../../../assets/images/carousel1.jpg'
    },
    {
      path: '../../../assets/images/carousel2.jpg'
    }];

  ngOnInit() {
  }


}
