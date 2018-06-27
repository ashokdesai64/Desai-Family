import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { GLOBAL } from '../../app/global';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-view-member',
  templateUrl: 'view-member.html',
})
export class ViewMemberPage {
  view_member: any;
  is_edit: boolean;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public user: User, 
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
    this.view_member = this.navParams.get('view_member');
    this.is_edit = this.navParams.get('is_edit');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  gotoviewmember() {
    this.navCtrl.push('ViewMemberPage');
  }

  deletemember() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.view_member) {
      this.user.deletemember({ id: this.view_member.id }).subscribe((resp: any) => {
        if (resp.status) {
          this.navCtrl.pop();   
        }
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
      });
    }
  }

  editmembermodal(member_id) {
    let edit_member_modal = this.modalCtrl.create('EditMemberPage', { member_id: member_id});
    edit_member_modal.present();
    edit_member_modal.onDidDismiss(data => {
      if (data != undefined) {
        this.view_member = data;
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
