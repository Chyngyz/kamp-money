import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, LocalStorageService, ModalViewService } from '../shared';

@Component({
    selector: 'kmp-settings-edit',
    templateUrl: 'settings-edit.component.html'
})
export class SettingsEditComponent implements OnInit, OnDestroy {
    private getUserDataSubscription: any;
    private userStatus: string;
    public formModel: Object = {
        first_name: '',
        last_name: '',
        middle_name: '',
        identification_number: '',
        gender: 'male',
        address: ''
    };
    constructor(
        private apiService: ApiService, 
        private localStorageService: LocalStorageService,
        private modalViewService: ModalViewService,
        private router: Router) { }

    ngOnInit() {
        this.getUserDetails();
    }

    getUserDetails() {
        let userData = this.localStorageService.getObject('user');
        if(!userData) {
            this.router.navigate(['/']);
        }
        this.getUserDataSubscription = this.apiService.getUserDetails(userData).subscribe(
            resp => {
                if (resp.message_code == 7001) {
                    this.userStatus = 'id_noteditable';
                    if (resp.customer_detail) {
                        this.bindToUserModel(resp.customer_detail);
                    }
                } else if (resp.message_code == 7002 && !resp.customer_detail) {
                    this.userStatus = 'notid_editable';
                } else if (resp.message_code == 7003 || (resp.message_code == 7002 && resp.customer_detail)) {
                    this.userStatus = 'waitingconfirm_noteditable';

                    if (resp.customer_detail) {
                        this.bindToUserModel(resp.customer_detail);
                    }
                } else if (resp.message_code == 7004) {
                    this.userStatus = 'waitingconfirmbank_noteditable';
                    if (resp.customer_detail) {
                        this.bindToUserModel(resp.customer_detail);
                    }
                }
            },
            error => console.log(error)
        );
    }

    bindToUserModel(data) {
        this.formModel = data;
    }

    ngOnDestroy() {
        // this.getUserDataSubscription.unsubscribe();
    }

    confirmDetails() {
        let userData = this.localStorageService.getObject('user');
        this.apiService.confirmUserDetails(userData).subscribe(
            resp => {
                console.log(resp);
                if(resp.submission_status === 'error') {
                    this.modalViewService.announceModalView(+resp.error_code);
                } else if (resp.submission_status === 'success') {
                    this.modalViewService.announceModalView(7001);
                    this.refreshDetails();
                }
            },
            error => console.log(error)
        )
    }

    refreshDetails() {
        this.getUserDataSubscription.unsubscribe();
        this.getUserDetails();
    }

    editDetails() {
        this.userStatus = 'notid_editable';
    }

    saveUserData(obj) {
        let userData = this.localStorageService.getObject('user');

        obj.phone_number = userData.phone_number;
        obj.app_id = userData.app_id;
        obj.app_token = userData.app_token;

        this.apiService.updateUserDetails(obj).subscribe(
            resp => {
                // to do change to message_code
                if (resp.submission_status && resp.submission_status === 'success') {
                    this.userStatus = 'waitingconfirm_noteditable';
                    this.formModel = obj;
                    this.refreshDetails();
                } else {
                    console.log('error');
                }
            },
            error => console.log(error)
        )
    }
}
