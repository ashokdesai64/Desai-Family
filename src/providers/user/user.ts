// import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core'
import { Api } from '../api/api';
import { HttpClient} from '@angular/common/http';
import { GLOBAL } from '../../app/global';
import { Events } from 'ionic-angular';

@Injectable()
export class User {
  _user: any;
  constructor(public api: Api, public http: HttpClient, public events: Events) { }

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

  updateprofile(details: any) {

    let body = new FormData();
    body.append('id', details.id);
    body.append('name', details.name);
    body.append('email', details.email);
    body.append('gender', details.gender);
    body.append('relation', details.relation);
    body.append('birthdate', details.birthdate);
    body.append('address', details.address);
    body.append('business', details.business);
    body.append('blood_group', details.blood_group);
    body.append('education', details.education);
    body.append('family_member', details.family_member);
    body.append('village', details.village);
    body.append('taluka', details.taluka);
    body.append('district', details.district);
    body.append('header', GLOBAL.API_HEADER);

    let seq = this.api.post('updateprofile', body).share();
    seq.subscribe((res: any) => {
      if (res.status) {
        if (GLOBAL.USER.id == details.id){
          this._loggedIn(details);
        } 
      }
     
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  
  sendotp(param: any) {

    let body = new FormData();
    body.append('id', param.id);
    body.append('mobile_no', param.mobile_no);
    body.append('header', GLOBAL.API_HEADER);

    return this.api.post('sendotp', body).share();
  }
  
  verifyotp(param: any) {

    let body = new FormData();
    body.append('id', param.id);
    body.append('otp', param.otp);
    body.append('header', GLOBAL.API_HEADER);

    let seq = this.api.post('verifyotp', body).share();
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
    let body = new FormData();
    body.append('name', accountInfo.name);
    body.append('email', accountInfo.email);
    body.append('password', accountInfo.password);
    body.append('header', GLOBAL.API_HEADER);

    return this.api.post('signup', body).share();
  }

  families(param) {
    param.header = GLOBAL.API_HEADER;
    return this.api.get('families', param).share();
  }

  news() {
    return this.api.get('news', { header: GLOBAL.API_HEADER}).share();
  }
  
  homeslider() {
    return this.api.get('homeslider', { header: GLOBAL.API_HEADER}).share();
  }

  members(id) {
    return this.api.get('members', { header: GLOBAL.API_HEADER, parent_id:id }).share();
  }
  
  results(userid) {
    return this.api.get('results', { header: GLOBAL.API_HEADER, userid: userid }).share();
  }
  
  addresult(param) {
    let body = new FormData();
    body.append('userid', param.userid);
    body.append('image', param.image);
    body.append('name', param.name);
    body.append('standard', param.standard);
    body.append('total_marks', param.total_marks);
    body.append('obtained_marks', param.obtained_marks);
    body.append('passing_year', param.passing_year);
    body.append('percentage', param.percentage);
    body.append('header', GLOBAL.API_HEADER);

    return this.api.post('addresult', body).share();
  }
  
  addmember(param) {
    let body = new FormData();
    body.append('name', param.name);
    body.append('gender', param.gender);
    body.append('blood_group', param.blood_group);
    body.append('image', param.image);
    body.append('birthdate', param.birthdate);
    body.append('mobile_no', param.mobile_no);
    body.append('email', param.email);
    body.append('address', param.address);
    body.append('business', param.business);
    body.append('education', param.education);
    body.append('relation', param.relation);
    body.append('parent_id', param.parent_id);
    body.append('header', GLOBAL.API_HEADER);

    return this.api.post('addmember', body).share();
  }
 
  editmember(param) {
    let body = new FormData();
    body.append('id', param.id);
    body.append('image', param.image);
    body.append('new_image', param.new_image);
    body.append('name', param.name);
    body.append('gender', param.gender);
    body.append('blood_group', param.blood_group);
    body.append('image', param.image);
    body.append('birthdate', param.birthdate);
    body.append('mobile_no', param.mobile_no);
    body.append('email', param.email);
    body.append('address', param.address);
    body.append('business', param.business);
    body.append('education', param.education);
    body.append('relation', param.relation);
    body.append('header', GLOBAL.API_HEADER);

    return this.api.post('editmember', body).share();
  }
  
  deletemember(param) {
    let body = new FormData();
    body.append('id', param.id);
    body.append('header', GLOBAL.API_HEADER);

    return this.api.post('deletemember', body).share();
  }
  
  deleteresult(param) {
    let body = new FormData();
    body.append('id', param.id);
    body.append('header', GLOBAL.API_HEADER);

    return this.api.post('deleteresult', body).share();
  }
  
  gallery(id) {
    return this.api.get('gallery', { header: GLOBAL.API_HEADER, category_id :id }).share();
  }

  galleries() {
    return this.api.get('galleries', { header: GLOBAL.API_HEADER }).share();
  }
  
  profile(id) {
    return this.api.get('profile', { header: GLOBAL.API_HEADER, id: id}).share();
  }
  
  deletefamilie(item) {
    let body = new FormData();
    body.append('id', item.id);
    body.append('header', GLOBAL.API_HEADER);

    return this.api.post('members', body).share();
  }

  _loggedIn(resp) {
    this.events.publish('user:loggedIn', resp);
    localStorage.setItem('is_loggedin', JSON.stringify(resp));
  }
}
