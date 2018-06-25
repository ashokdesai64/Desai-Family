import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { User } from '../../providers';
import { GLOBAL } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-family-members',
  templateUrl: 'family-members.html',
})
export class FamilyMembersPage {
  details: any = [];
  members :any = [];
  current_user: any = GLOBAL.USER.id;
  is_admin: any = GLOBAL.USER.role;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public user: User,
    public loadingCtrl: LoadingController, 
    public modalCtrl: ModalController,
    private statusBar: StatusBar) {
    this.statusBar.styleLightContent();
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }

    this.details = this.navParams.get('family');
    if (this.details == undefined) {
      this.navCtrl.setRoot('FamiliesPage');
    }
  }
  
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.details){
      this.user.members(this.details.id).subscribe((resp: any) => {
        if (resp.status) {
          this.members = resp.data;
        }
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
      });
    } 
  }

  AddMemberModal() {
    if (this.details) {
      let modal = this.modalCtrl.create('AddMemberPage', { parent_id: this.details.id});
      modal.present();
      modal.onDidDismiss(data => { 
        if (data != undefined){
          this.members.push(data);
        }
      });
    }
  } 

  deletemember(item){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.details) {
      this.user.deletemember({ id: item.id}).subscribe((resp: any) => {
        if (resp.status) {
          this.members.splice(this.members.indexOf(item), 1);
        }
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
      });
    } 
  }

  gotoviewmember(view_member) {
    this.showLoader();
    this.navCtrl.push('ViewMemberPage', { view_member: view_member});
  }

  gotprofileedit(details) {
    this.showLoader();
    this.navCtrl.push('ProfilePage', { details:details});
  }

  showLoader() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
  }
}
