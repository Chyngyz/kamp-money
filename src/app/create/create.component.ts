import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kmp-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  public telNumber = '';
  public mask = ['0', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  constructor() {
    // Do stuff
  }

  ngOnInit() { }

}
