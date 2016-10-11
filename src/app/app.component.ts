import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { ApiService, AppReadyEvent, ModalViewService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'kmp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentChecked {
  public viewportHeight: number;
  public modalTriggerMessage: any;

  opened: boolean = false;

  open() {
    this.opened = !this.opened;
  }


  constructor(
    private api: ApiService,
    private appReadyEvent: AppReadyEvent,
    private modalViewService: ModalViewService) { }

  ngOnInit() {
    this.viewportHeight = window.innerHeight;

    this.modalViewService.modalView$.subscribe(message => {
      this.modalTriggerMessage = message;
      this.open();
    })
  }

  ngAfterContentChecked() {
    setTimeout(() => {
      this.appReadyEvent.trigger();
    }, 300);
  }
}
