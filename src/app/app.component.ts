import { Component, OnInit } from '@angular/core';

import { ApiService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'kmp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public viewportHeight: number;

  constructor(private api: ApiService) {
    // Do something with api
  }

  ngOnInit() {
    this.viewportHeight = window.innerHeight;
  }
}
