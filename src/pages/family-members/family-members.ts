import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { User } from '../../providers';

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

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.details = this.navParams.get('family');
    this.user.members(this.details.id).subscribe((resp: any) => {
      if (resp.status) {
        this.members = resp.data;
      }
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
    });
  }

  AddMemberModal() {
    let modal = this.modalCtrl.create('AddMemberPage');
    modal.present();
  } 

  gotoviewmember(details) {
    this.showLoader();
    this.navCtrl.push('ViewMemberPage', { details: details});
  }

  gotprofileedit() {
    this.showLoader();
    this.navCtrl.push('ProfilePage');
  }

  showLoader() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
  }
}
