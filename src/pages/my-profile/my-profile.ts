import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { GLOBAL } from '../../app/global';
import { StatusBar } from '@ionic-native/status-bar';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  details: any = [];
  members: any = [];

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

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.user.profile(GLOBAL.USER.id).subscribe((resp: any) => {
      if (resp.status) {
        this.details = resp.data;
        this.user.members(this.details.id).subscribe((resp: any) => {
          if (resp.status) {
            this.members = resp.data;
          }
        }, (err) => {
        });
      }
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
    });
  }

  AddMemberModal() {
    if (this.details) {
      let modal = this.modalCtrl.create('AddMemberPage', { parent_id: this.details.id });
      modal.present();
      modal.onDidDismiss(data => {
        if (data != undefined) {
          this.members.push(data);
        }
      });
    }
  }

  deletemember(item) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.details) {
      this.user.deletemember({ id: item.id }).subscribe((resp: any) => {
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
    this.navCtrl.push('ViewMemberPage', { view_member: view_member, is_edit: true });
  }

  gotprofileedit(id) {
    this.showLoader();
    this.navCtrl.push('EditProfilePage', { id: id });
  }

  showLoader() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
  }
}
