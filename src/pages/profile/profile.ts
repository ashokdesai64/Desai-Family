import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';

import { GLOBAL } from '../../app/global';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  homePage = HomePage;
  details: any;
  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController, 
    public user: User, 
    private statusBar: StatusBar ) {
    this.statusBar.styleLightContent();
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }
  }

  ionViewDidLoad() {
    this.details = this.navParams.get('details');
    console.log(this.details);
  }

  gotohome() {
    this.navCtrl.setRoot('HomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  updateProfile(){
    console.log(this.details);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.user.updateprofile(this.details).subscribe((resp: any) => {
      if (resp.status) {
        let toast = this.toastCtrl.create({
          message: resp.message,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();  
      }
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

}
