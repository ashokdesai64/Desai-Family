import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
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
    email: 'abc@gmail.com',
    password: '123456'
  };

  constructor(public navCtrl: NavController, private statusBar: StatusBar,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.statusBar.styleDefault();
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp: any) => {
      if (resp.status == 200){
        this.navCtrl.setRoot('HomePage', {}, {
          animate: true,
          direction: 'forward'
        });
      }
      else{
        let toast = this.toastCtrl.create({
          message: resp.message,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();  
      }
    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: 'Something went wrong!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  gotosignup() {
    this.navCtrl.setRoot('SignupPage', {}, {
      animate: true,
      direction: 'forward'
    }) 
  }
}
