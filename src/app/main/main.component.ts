import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService, ModalViewService, LocalStorageService } from '../shared';

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
        private modalViewService: ModalViewService,
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
                if (resp.submission_status && resp.submission_status === 'error' && resp.message_code === '3805') {
                    this.modalViewService.announceModalView(3805);
                    this.localStorageService.removeItem('user');
                    this.router.navigate(['/']);
                } else if (resp.submission_status && resp.submission_status === 'success') {
                    this.balance = resp.customer_balance;
                }
            },
            error => console.log(error)
        );
    }
}
