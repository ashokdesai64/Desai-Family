import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { GLOBAL } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  landing: {};
  constructor(public navCtrl: NavController, public platform: Platform, private statusBar: StatusBar) {
    this.landing = {
      title: 'Welcome to the Desai Family',
      buttonText: 'Continue',
    }
    this.statusBar.styleLightContent();
  }

  startApp() {
    this.navCtrl.setRoot('SendotpPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }
}
