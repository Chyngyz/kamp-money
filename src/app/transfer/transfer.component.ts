import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, LocalStorageService } from '../shared';

@Component({
    selector: 'kmp-transfer',
    templateUrl: 'transfer.component.html',
    styleUrls: ['transfer.component.scss']
})
export class TransferComponent implements OnInit {
    private getUserDataSubscription: any;
    public balance: number;
    constructor(
        private apiService: ApiService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit() {
        let userData = this.localStorageService.getObject('user');
        console.log(userData);
        if(userData) {
            this.getUserBalance(userData);
        } else {
            this.router.navigate(['/'])
        }
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