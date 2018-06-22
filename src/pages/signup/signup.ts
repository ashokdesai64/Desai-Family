import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { User } from '../../providers';
import { GLOBAL } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  account: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    private statusBar: StatusBar
    ) {

      this.statusBar.styleDefault();
      this.menuCtrl.swipeEnable(false);
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN) {
      this.navCtrl.setRoot('HomePage');
    }
  }
  
  doSignup() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loading.present();
    this.user.signup(this.account).subscribe((resp: any) => {
      if (resp.status){
        this.navCtrl.push('SendotpPage', { id: resp.user_id});
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

  gotologin(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
    this.navCtrl.setRoot('LoginPage'
  ) 
  }
}
