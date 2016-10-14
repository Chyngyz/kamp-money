import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kmp-settings-edit',
    templateUrl: 'settings-edit.component.html'
})
export class SettingsEditComponent implements OnInit {
    public formModel: Object = {
        first_name: '',
        last_name: '',
        middle_name: '',
        identification_number: '',
        gender: 'male',
        address: ''
    };
    constructor() { }

    ngOnInit() { }

    saveUserData(obj) {
        console.log(obj);
    }
}
