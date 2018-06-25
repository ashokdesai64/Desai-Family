import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { GLOBAL } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-view-member',
  templateUrl: 'view-member.html',
})
export class ViewMemberPage {
  view_member: any;

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
    let view_member = this.navParams.get('view_member');
    this.view_member = view_member;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  gotoviewmember() {
    this.navCtrl.push('ViewMemberPage');
  }

  editmembermodal(edit_member) {
    let edit_member_modal = this.modalCtrl.create('EditMemberPage', { edit_member: edit_member});
    edit_member_modal.present();
    edit_member_modal.onDidDismiss(data => {
      if (data != undefined) {
        console.log('Data =>',data);
        // this.view_member = data;
      }
    });
  }

  showLoader() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
  }
}
