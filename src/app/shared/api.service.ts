import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';

import { AppSettings } from '../app.settings';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private apiRegUrl = `${AppSettings.API_ENDPOINT}/registration`;
  private apiUserDetailsUrl = `${AppSettings.API_ENDPOINT}/customer_detail_info`;
  private apiUserBalanceUrl = `${AppSettings.API_ENDPOINT}/kamp_customer_details/customer_balance`;

  constructor(private _http: Http) {}

  registration(data): Observable < any > {
    console.log(JSON.stringify(data));

    return this._http.post(this.apiRegUrl, JSON.stringify(data), {
            headers: this.getHeaders()
        })
        .map(this.extractData)
        .catch(this.handleError);
  }

  getUserDetails(data) {
    return this._http.post(this.apiRegUrl, JSON.stringify(data), {
            headers: this.getHeaders()
        })
        .map(this.extractData)
        .catch(this.handleError);
  }

  getAppId() {
    return Math.floor((Math.random() * 10) + 1);
  }

  getUserBalance(data) {
    return this._http.post(this.apiUserBalanceUrl, JSON.stringify(data), {
            headers: this.getHeaders()
        })
        .map(this.extractData)
        .catch(this.handleError);
  }

  getToken() {
    return 'test_token_123blabla123123asd';
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return headers;
  }

  private extractData(res: Response) {
      let body = res.json();
      return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
