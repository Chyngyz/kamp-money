import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, LocalStorageService, ModalViewService } from '../shared';

@Component({
    selector: 'kmp-t-history',
    templateUrl: 't-history.component.html',
    styleUrls: ['t-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {
    public data: any;
    public transactionsExist: boolean;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private localStorageService: LocalStorageService,
        private modalViewService: ModalViewService
    ) { }

    ngOnInit() {
        let userData = this.localStorageService.getObject('user');
        
        if(!userData) {
            this.router.navigate(['/main'])
        } else {
            this.getHistory();
        }
    }

    getHistory() {
        let userData = this.localStorageService.getObject('user');
        
        this.apiService.getTransactionsHistory(userData).subscribe(
            resp => {
                console.log(resp);
                if(resp.transactions && resp.transactions['1']) {
                    this.data = [resp.transactions];
                    this.transactionsExist = true;
                } else {
                    this.transactionsExist = false;
                }
                
            },
            error => {
                console.log(error);
            }
        )
    }
}