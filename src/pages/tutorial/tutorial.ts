import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { GLOBAL } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  landing: {};
  constructor(public navCtrl: NavController, public menu: MenuController, public platform: Platform, private statusBar: StatusBar) {
    // if (GLOBAL.IS_LOGGEDIN.id){
    //   this.navCtrl.setRoot('HomePage', {}, {
    //     animate: true,
    //     direction: 'forward'
    //   });
    // }
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
