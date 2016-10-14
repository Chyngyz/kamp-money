import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, AppReadyEvent, ModalViewService, LocalStorageService } from './shared';

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
    private modalViewService: ModalViewService,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.viewportHeight = window.innerHeight;

    this.modalViewService.modalView$.subscribe(message => {
      this.modalTriggerMessage = message;
      this.open();
    });

    let userData = this.localStorageService.getObject('user');
    if(userData !== undefined) {
      this.router.navigate(['/main']);
    }
  }

  ngAfterContentChecked() {
    setTimeout(() => {
      this.appReadyEvent.trigger();
    }, 300);
  }
}
