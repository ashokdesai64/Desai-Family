import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { GLOBAL } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-view-member',
  templateUrl: 'view-member.html',
})
export class ViewMemberPage {
  details: any;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public loadingCtrl: LoadingController, 
    public modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }
  }
  
  ionViewDidLoad() {
    this.details = this.navParams.get('details');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  gotoviewmember() {
    this.navCtrl.push('ViewMemberPage');
  }
  EditMemberModal() {
    let modal = this.modalCtrl.create('EditMemberPage');
    modal.present();
  }

  showLoader() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
  }
}
