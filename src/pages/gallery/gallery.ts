import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { User } from '../../providers';
import { GLOBAL } from '../../app/global';


@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  galleries: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public user: User,
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
    this.user.galleries().subscribe((resp: any) => {
      if (resp.status) {
        this.galleries = resp.data;
      }
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
    });
  }

  gotoviewgallery(gallery) {
    this.navCtrl.push('ViewGalleryPage', {
      gallery: gallery
    });
  }
}
