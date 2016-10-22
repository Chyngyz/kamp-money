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
    public transactionId: any;

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
            this.telNumber = transferData.target_number;
            this.amount = transferData.requested_amount;
            this.transactionId = transferData.transaction_number;
        }
    }

    confirmTransfer() {
        let userData = this.localStorageService.getObject('user');
        userData.approved = 1;

        
        this.apiService.transferConfirm(userData, this.transactionId).subscribe(
            resp => {
                if (resp.transaction_status && resp.transaction_status === 'complete') {
                    this.modalViewService.announceModalView(9001);
                    this.router.navigate(['/transactions-history']);
                }
            },
            error => {
                console.log(error);
            }
        )
    }
}