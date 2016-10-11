import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'kmp-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  public telNumber = '';
  public username = '';
  public data: any = {};
  public mask = ['9', '9', '6', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  public telValid: boolean;
  public nameValid: boolean;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

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
          if (resp.submission_status && resp.submission_status == 'success') {
            this.router.navigate(['/main']);
          } else if (resp.status && resp.status == 'Wrong number format') {
            // Здесь будет вызов error handler
            console.log("Wrong number format");
          } else if (resp.status && resp.status == 'Customer already exist, token update') {
            // Здесь будет вызов error handler
            console.log('Customer already exist, token update');
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
