import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GLOBAL } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-view-news',
  templateUrl: 'view-news.html',
})
export class ViewNewsPage {
  single_news: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }
  }
  
  ionViewDidLoad() {
    this.single_news = this.navParams.get('single_news');
  }
}
