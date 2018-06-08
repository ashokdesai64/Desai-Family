import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerifyotpPage } from '../verifyotp/verifyotp';

@IonicPage()
@Component({
  selector: 'page-sendotp',
  templateUrl: 'sendotp.html',
})
export class SendotpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendotpPage');
  }

  gotoverifyotp() {
    this.navCtrl.push(VerifyotpPage);
  }

}
