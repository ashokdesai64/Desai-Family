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
  details :any;
  members :any;
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
  }
  
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.details = this.navParams.get('family');
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
    let modal = this.modalCtrl.create('AddMemberPage');
    modal.present();
  } 

  gotoviewmember(details) {
    this.showLoader();
    this.navCtrl.push('ViewMemberPage', { details: details});
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
