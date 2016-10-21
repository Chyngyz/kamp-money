import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, LocalStorageService, ModalViewService } from '../shared';

@Component({
    selector: 'kmp-transfer',
    templateUrl: 'transfer.component.html',
    styleUrls: ['transfer.component.scss']
})
export class TransferComponent implements OnInit {
    private getUserDataSubscription: any;
    public balance: number;
    public telNumber = '';
    public amount = '';
    public data: any = {};
    public mask = ['9', '9', '6', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

    public telValid: boolean = true;
    public amountValid: boolean = true;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private localStorageService: LocalStorageService,
        private modalViewService: ModalViewService
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

    transfer() {
        let userData = this.localStorageService.getObject('user');
        let validationStatus: [boolean, boolean] = [false, false];
        
        validationStatus = this.validateInputs(this.telNumber, this.amount);
        console.log(validationStatus);
        if (validationStatus[0] === false) {
            this.telValid = false;
        } else if (validationStatus[1] === false) {
            this.amountValid = false;
        } else {
            this.data.source_number = userData.phone_number;
            this.data.app_id = userData.app_id;
            this.data.app_token = this.apiService.getToken();
            this.data.requested_amount = this.amount;
            this.data.target_number = this.getTelFormated(this.telNumber);
            this.data.client_type = "MobileWeb";

            this.apiService.transferSend(this.data).subscribe(
                resp => {
                if (resp.submission_status && resp.submission_status == 'success' && resp.message_code == 7000) {
                    this.modalViewService.announceModalView(7000);
                    this.telNumber = '';
                } else if (resp.submission_status && resp.submission_status == 'error' && resp.error_code == 3809) {
                    this.modalViewService.announceModalView(3809);
                    this.telNumber = '';
                    this.telValid = true;
                    this.amountValid = true;
                    console.log("Wrong number format");
                } else if (resp.submission_status && resp.submission_status == 'problem' && resp.error_code == 3805) {
                    this.modalViewService.announceModalView(3805);
                    this.telNumber = '';
                    this.telValid = true;
                    this.amountValid = true;
                    console.log("Wrong number format");
                } else if (resp.submission_status && resp.submission_status == 'success') {
                    this.localStorageService.setObject('transfer', this.data);
                    this.router.navigate(['/transfer-confirm']);
                }
                },
                error => console.log(error)
            );
        }
    }

    validateInputs(tel: string, amount: string): [boolean, boolean] {
        let telStatus: boolean = false;
        let amountStatus: boolean = false;
        let formatedTel: string = this.getTelFormated(tel);
        if(formatedTel.length === 12 && tel.indexOf('_') == -1) {
        telStatus = true;
        }

        console.log(amount);

        if(+amount > 0) {
        amountStatus = true;
        }

        return [telStatus, amountStatus];
    }

    getTelFormated(tel) {
        return tel.split(' ').join('').split('(').join('').split(')').join('');
    }
}