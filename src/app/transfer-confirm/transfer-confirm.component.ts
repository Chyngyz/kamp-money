import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, LocalStorageService, ModalViewService } from '../shared';

@Component({
    selector: 'kmp-transfer-confirm',
    templateUrl: 'transfer-confirm.component.html',
    styleUrls: ['transfer-confirm.component.scss']
})
export class TransferConfirmComponent implements OnInit {
    private getUserDataSubscription: any;
    public telNumber: any;
    public amount: any;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private localStorageService: LocalStorageService,
        private modalViewService: ModalViewService
    ) { }

    ngOnInit() {
        let transferData = this.localStorageService.getObject('transfer');
        
        if(!transferData) {
            this.router.navigate(['/transfer'])
        } else {
            this.telNumber = transferData.source_number;
            this.amount = transferData.requested_amount;
        }
    }

    confirmTransfer() {
        let userData = this.localStorageService.getObject('user');
        
        this.apiService.transferConfirm(userData).subscribe(
            resp => {
                console.log(resp);
            },
            error => {
                console.log(error);
            }
        )
    }
}