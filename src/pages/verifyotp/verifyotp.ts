import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-verifyotp',
  templateUrl: 'verifyotp.html',
})
export class VerifyotpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar) {
    this.statusBar.styleDefault();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyotpPage');
  }

  gotoprofile(){
    this.navCtrl.setRoot('ProfilePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }
}
