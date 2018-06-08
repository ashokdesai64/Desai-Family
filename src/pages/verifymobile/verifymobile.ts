import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerifyotpPage } from '../verifyotp/verifyotp';

/**
 * Generated class for the VerifymobilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifymobile',
  templateUrl: 'verifymobile.html',
})
export class VerifymobilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifymobilePage');
  }

  gotoVerifyotp() {
    this.navCtrl.push(VerifyotpPage);
  }
}
