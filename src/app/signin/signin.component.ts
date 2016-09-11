import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kmp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public telNumber = '';
  public mask = ['0', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello About');
  }

  show() {
    console.log(this.telNumber);
  }

}
