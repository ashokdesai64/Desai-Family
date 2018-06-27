import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

data: any;
constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public toastCtrl: ToastController,
  public loadingCtrl: LoadingController,
  public viewCtrl: ViewController,
  // public camera: Camera,
) {
}

ionViewDidLoad() {
  console.log('ionViewDidLoad ForgotPasswordPage');
}

gotologin() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...',
    dismissOnPageChange: true
  });
  loading.present();
  this.navCtrl.setRoot('LoginPage'
  )
}

dismiss() {
  this.viewCtrl.dismiss(this.data);
}

}
