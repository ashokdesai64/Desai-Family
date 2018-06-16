import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  news: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public user: User, 
    public loadingCtrl: LoadingController,
    private statusBar: StatusBar) {
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.user.news().subscribe((resp: any) => {
      if (resp.status) {
        this.news = resp.data;
      }
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
    });
  }

  gotoviewnews(single_news){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
    this.navCtrl.push('ViewNewsPage', { single_news: single_news});
  }

  trim_str(value: string, limit): string {
    let trail = limit > 50 ? '...' : '';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
