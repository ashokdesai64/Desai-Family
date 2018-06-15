import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core'
import { Api } from '../api/api';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class User {
  constructor(public api: Api, public http: HttpClient) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {

    let body = new FormData();
    body.append('email', accountInfo.email);
    body.append('password', accountInfo.password);
    body.append('header', 'a2309455-13c0-4b5a-b9c1-5e9e65dc0704');

    let seq = this.api.post('login', body).share();
    seq.subscribe((res: any) => {
      if (res.status) {
        this._loggedIn(res.data);
      } 
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
        this._loggedIn(res.data);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  members() {
    let seq = this.api.get('members', { header:'a2309455-13c0-4b5a-b9c1-5e9e65dc0704'}).share();
    seq.subscribe((res: any) => {
      return res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    localStorage.removeItem('is_loggedin');
    // localStorage.setItem('is_loggedin', '');
    // this.storage.set('loggedInUser', '').then(() => { });
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    localStorage.setItem('is_loggedin', JSON.stringify(resp));
    // this.storage.set('loggedInUser', resp).then(() => {});
    // this._user = resp;
  }
}
