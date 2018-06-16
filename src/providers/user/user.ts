// import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core'
import { Api } from '../api/api';
import { HttpClient} from '@angular/common/http';
import { GLOBAL } from '../../app/global';

@Injectable()
export class User {
  constructor(public api: Api, public http: HttpClient) { }

  login(accountInfo: any) {

    let body = new FormData();
    body.append('email', accountInfo.email);
    body.append('password', accountInfo.password);
    body.append('header', GLOBAL.API_HEADER);

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

  families(param) {
    param.header = GLOBAL.API_HEADER;
    let seq = this.api.get('families', param).share();
    seq.subscribe((res: any) => {
      return res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  news() {
    let seq = this.api.get('news', { header: GLOBAL.API_HEADER}).share();
    seq.subscribe((res: any) => {
      return res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  
  homeslider() {
    let seq = this.api.get('homeslider', { header: GLOBAL.API_HEADER}).share();
    seq.subscribe((res: any) => {
      return res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  members(id) {
    let seq = this.api.get('members', { header: GLOBAL.API_HEADER, parent_id:id }).share();
    seq.subscribe((res: any) => {
      return res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  
  gallery(id) {
    let seq = this.api.get('gallery', { header: GLOBAL.API_HEADER, category_id :id }).share();
    seq.subscribe((res: any) => {
      return res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  
  deletefamilie(item) {
    let body = new FormData();
    body.append('id', item.id);
    body.append('header', GLOBAL.API_HEADER);

    let seq = this.api.post('members', body).share();
    seq.subscribe((res: any) => {
      return res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  _loggedIn(resp) {
    localStorage.setItem('is_loggedin', JSON.stringify(resp));
  }
}
