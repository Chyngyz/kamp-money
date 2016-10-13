import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kmp-settings-edit',
    templateUrl: 'settings-edit.component.html'
})
export class SettingsEditComponent implements OnInit {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    constructor() { }

    ngOnInit() { }
}
