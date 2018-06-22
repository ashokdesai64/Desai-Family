import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { User } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-verifyotp',
  templateUrl: 'verifyotp.html',
})
export class VerifyotpPage {

  verify: { otp: string, id: string, mobile_no: string } = {
    otp: '',
    id: '',
    mobile_no: '',
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public user: User,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private statusBar: StatusBar) {
    this.statusBar.styleDefault();

  }

  ionViewCanEnter() {
    this.verify.id = this.navParams.get('id');
    this.verify.otp = this.navParams.get('otp');
    this.verify.mobile_no = this.navParams.get('mobile_no');
    if (this.verify.id == undefined) {
      this.navCtrl.setRoot('SignupPage');
    }
  }

  ionViewDidLoad() {
    console.log(this.verify);
  }

  verifyotp(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loading.present();
    this.user.verifyotp(this.verify).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status) {
        this.navCtrl.setRoot('HomePage');
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

  resendotp(param) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loading.present();
    this.user.sendotp(param).subscribe((resp: any) => {
      if (resp.status) {
        this.verify = resp.data;
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

  gotoprofile(){
    this.navCtrl.setRoot('ProfilePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }
}
