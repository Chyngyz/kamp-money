import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, ModalViewService, LocalStorageService } from '../shared';

@Component({
  selector: 'kmp-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  public telNumber = '';
  public username = '';
  public data: any = {};
  public mask = ['9', '9', '6', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  public telValid: boolean = true;
  public nameValid: boolean = true;

  constructor(
    private apiService: ApiService,
    private modalViewService: ModalViewService,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit() { }

  register() {
    let validationStatus: [boolean, boolean] = [false, false];
    
    validationStatus = this.validateInputs(this.telNumber, this.username);
    console.log(validationStatus);
    if (validationStatus[0] === false) {
      this.telValid = false;
    } else if (validationStatus[1] === false) {
      this.nameValid = false;
    } else {
      this.data.phone_number = this.getTelFormated(this.telNumber);
      this.data.app_id = String(this.apiService.getAppId());
      this.data.app_token = this.apiService.getToken();

      this.apiService.registration(this.data).subscribe(
        resp => {
          if (resp.submission_status && resp.submission_status == 'success' && resp.message_code == 7000) {
            this.modalViewService.announceModalView(7000);
            this.telNumber = '';
          } else if (resp.submission_status && resp.submission_status == 'error' && resp.error_code == 3809) {
            this.modalViewService.announceModalView(3809);
            this.telNumber = '';
            this.telValid = true;
            this.nameValid = true;
            console.log("Wrong number format");
          } else if (resp.submission_status && resp.submission_status == 'success') {
            this.localStorageService.setObject('user',this.data);
            this.router.navigate(['/main']);
          }
        },
        error => console.log(error)
      );
    }


    
  }

  validateInputs(tel: string, name: string): [boolean, boolean] {
    let telStatus: boolean = false;
    let nameStatus: boolean = false;
    let formatedTel: string = this.getTelFormated(tel);
    if(formatedTel.length === 12 && tel.indexOf('_') == -1) {
      telStatus = true;
    }

    if(name.length >= 3) {
      nameStatus = true;
    }

    return [telStatus, nameStatus];
  }

  getTelFormated(tel) {
    return tel.split(' ').join('').split('(').join('').split(')').join('');
  }
}
