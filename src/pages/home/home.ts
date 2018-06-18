import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, LoadingController, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GLOBAL } from '../../app/global';

import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  slides = [];
  constructor(
    public navCtrl: NavController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController, 
    public menuCtrl: MenuController, 
    public user: User, 
    private statusBar: StatusBar) {
    this.statusBar.styleLightContent();

    this.menuCtrl.swipeEnable(true);
  }

  ionViewCanEnter() {
      if (GLOBAL.IS_LOGGEDIN === false) {
        this.navCtrl.setRoot('LoginPage');
      }
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.user.homeslider().subscribe((resp: any) => {
      if (resp.status) {
        this.slides = resp.data;
      }
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
    });
  }

  gotofamilies(){
    this.navCtrl.push('FamiliesPage');
  }
  
  gotoabout(){
    this.showLoader();
    this.navCtrl.push('AboutFamilyPage');
  }

  gotogallery() {
    this.navCtrl.push('GalleryPage');
  }

  gotonews() {
    this.navCtrl.push('NewsPage');
  }
  
  gotonotifications() {
    this.navCtrl.push('NotificationsPage');
  }

  showLoader() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
  }
}
