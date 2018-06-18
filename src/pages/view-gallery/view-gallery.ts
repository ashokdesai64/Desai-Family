import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { User } from '../../providers';
import { GLOBAL } from '../../app/global';


@IonicPage()
@Component({
  selector: 'page-view-gallery',
  templateUrl: 'view-gallery.html',
})
export class ViewGalleryPage {
  gallery: any;
  gallery_item: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public user: User, 
    public loadingCtrl: LoadingController, 
    private statusBar: StatusBar) {
    this.statusBar.styleLightContent();
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
    
    this.gallery = this.navParams.get('gallery');
    if (this.gallery){
      this.user.gallery(this.gallery.id).subscribe((resp: any) => {
        if (resp.status) {
          this.gallery_item = resp.data;
        }
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
      });
    }
  }
  
}
