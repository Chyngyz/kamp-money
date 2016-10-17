import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService, LocalStorageService } from '../shared';

@Component({
    selector: 'kmp-main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {
    public balance: number;
    private getUserDataSubscription: any;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private localStorageService: LocalStorageService) { }

    ngOnInit() {
        let userData = this.localStorageService.getObject('user');
        console.log(userData);
        if(userData) {
            this.getUserBalance(userData);
        } else {
            this.router.navigate(['/'])
        }
    }

    ngOnDestroy() {
        // this.getUserDataSubscription.unsubscribe();
    }

    getUserBalance(userData?) {
        if(!userData) {
            userData = this.localStorageService.getObject('user');
        }
        this.getUserDataSubscription = this.apiService.getUserBalance(userData).subscribe(
            resp => {
                console.log(resp);
                this.balance = resp.customer_balance;
            },
            error => console.log(error)
        );
    }
}
