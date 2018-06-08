import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { SendotpPage } from '../sendotp/sendotp';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  landing: {};
  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.landing = {
      title: 'Welcome to the Desai Family',
      buttonText: 'Continue',
    }
  }

  startApp() {
    this.navCtrl.push(SendotpPage);
  }
}
