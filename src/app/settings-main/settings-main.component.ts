import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, LocalStorageService } from '../shared';

@Component({
    selector: 'kmp-settings-main',
    templateUrl: 'settings-main.component.html'
})
export class SettingsMainComponent implements OnInit {
    constructor(
        private apiService: ApiService, 
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    ngOnInit() { }

    logOut() {
        this.localStorageService.removeItem('user');
        this.router.navigate(['/']);
    }
}
