import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { User } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-sendotp',
  templateUrl: 'sendotp.html',
})
export class SendotpPage {
  authentication: { mobile_no: string, id: string } = {
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
    this.statusBar.styleLightContent();

  }
  ionViewCanEnter() {
    this.authentication.id = this.navParams.get('id');
    if (this.authentication.id == undefined) {
      this.navCtrl.setRoot('SignupPage');
    }
  }

  ionViewDidLoad() {
    
  }

  sendotp(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loading.present();
    this.user.sendotp(this.authentication).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status) {
        this.navCtrl.push('VerifyotpPage', { id: resp.data.id, otp: resp.data.otp, mobile_no: resp.data.mobile_no });
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

  gotoverifyotp() {
    this.navCtrl.setRoot('VerifyotpPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

}
