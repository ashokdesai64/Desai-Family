import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerifyotpPage } from '../verifyotp/verifyotp';

/**
 * Generated class for the SendotpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    alert();
  }

}
