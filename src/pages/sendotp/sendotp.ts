import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-sendotp',
  templateUrl: 'sendotp.html',
})
export class SendotpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar) {
    this.statusBar.styleLightContent();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendotpPage');
  }

  gotoverifyotp() {
    this.navCtrl.setRoot('VerifyotpPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

}
