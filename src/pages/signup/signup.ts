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
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string } = {
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    private statusBar: StatusBar
    ) {

      this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
      this.statusBar.styleDefault();

      this.menuCtrl.swipeEnable(false);
    })
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
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      loading.dismiss();
      this.navCtrl.push('HomePage');
    }, (err) => {

      this.navCtrl.push('HomePage');

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
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
