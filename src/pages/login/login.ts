import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'jaydip@gmail.com',
    password: '12345678'
  };

  constructor(public navCtrl: NavController, private statusBar: StatusBar,
    public user: User,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService) {
    this.statusBar.styleDefault();

    // this.user.members().subscribe((resp: any) => {
    //   console.log(resp);
    // });
  }

  // Attempt to login in through our User service
  doLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.user.login(this.account).subscribe((resp: any) => {
      loading.dismiss();
      
      setTimeout(() => {
        this.navCtrl.setRoot('HomePage', {}, {
          animate: true,
          direction: 'forward'
        });
      }, 1000);
    
      let toast = this.toastCtrl.create({
        message: resp.message,
        duration: 1000,
        position: 'bottom'
      });
      toast.present();  

    }, (err) => {
      // Unable to log in
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  gotosignup() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange:true
    });
    loading.present();
    this.navCtrl.setRoot('SignupPage', {}, {
      animate: true,
      direction: 'forward'
    }) 
  }
}
