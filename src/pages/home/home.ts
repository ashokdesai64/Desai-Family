import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, LoadingController} from 'ionic-angular';
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
    public user: User, 
    private statusBar: StatusBar) {
    console.log('User::' + GLOBAL.IS_LOGGEDIN);
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.user.homeslider().subscribe((resp: any) => {
      if (resp.status) {
        this.slides = resp.data;
        this.slides.forEach(element => {
          element.image = resp.image_path + element.image;
        });
      }
      loading.dismiss();
    });
  }

  gotofamilies(){
    this.navCtrl.push('FamiliesPage');
  }
  
  gotoabout(){
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
}
