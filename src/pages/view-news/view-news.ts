import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-news',
  templateUrl: 'view-news.html',
})
export class ViewNewsPage {
  single_news: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.single_news = this.navParams.get('single_news');
  }
}
