import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'kmp-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  public telNumber = '';
  public data: any = {};
  public mask = ['0', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { }

  register() {
    console.log(this.telNumber);
    this.data.phone_number = this.telNumber;
    this.data.app_id = this.apiService.getAppId();
    this.data.app_token = this.apiService.getToken();

    this.apiService.registration(this.data).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/main']);
      },
      error => console.log(error)
    );
  }
}
