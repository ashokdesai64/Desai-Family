import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-about-family',
  templateUrl: 'about-family.html',
})
export class AboutFamilyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar) {
    this.statusBar.styleLightContent();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutFamilyPage');
  }

}
