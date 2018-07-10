import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController , ModalController, LoadingController, MenuController,  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { User } from '../../providers';
import { GLOBAL } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  account: { email: string, password: string } = {
    email: 'jaydip@gmail.com',
    password: '12345678'
  };
  
  details: any = [];
  members: any = [];

  constructor(
    public navCtrl: NavController, 
    private statusBar: StatusBar,
    public user: User,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController, 
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public translateService: TranslateService) {
    this.statusBar.styleLightContent();

    this.menuCtrl.swipeEnable(false);
  }

  ionViewCanEnter(){
    if (GLOBAL.IS_LOGGEDIN){
      this.navCtrl.setRoot('HomePage');
    }
  }

  // Attempt to login in through our User service
  doLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.user.login(this.account).subscribe((resp: any) => {
      loading.dismiss();
      if (resp.status){
        setTimeout(() => {
          this.navCtrl.setRoot('HomePage');
        }, 1000);

        let toast = this.toastCtrl.create({
          message: resp.message,
          duration: 1000,
          cssClass: 'toast-success',
          position: 'bottom'
        });
        toast.present();  
      }
    }, (err) => {
      // Unable to log in
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        cssClass: 'toast-error',
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
    this.navCtrl.setRoot('SignupPage')
  }

  // ForgotPasswordModal() {
  //   if (this.details) {
  //     let modal = this.modalCtrl.create('ForgotPasswordPage', { parent_id: this.details.id });
  //     modal.present();
  //     modal.onDidDismiss(data => {
  //       if (data != undefined) {
  //         this.members.push(data);
  //       }
  //     });
  //   }
  // } 

  ForgotPasswordalert() {
    let alert = this.alertCtrl.create({
      title: 'Forgot Password',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Enter Valid Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            if (true) {
              // Forgot Password!  
            } else {
              // invalid forgotpassword
            }
          }
        }
      ]
    });
    alert.present();
  }
}
