import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-verifyotp',
  templateUrl: 'verifyotp.html',
})
export class VerifyotpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyotpPage');
  }

  gotoprofile(){
    this.navCtrl.push(ProfilePage);
  }
}
