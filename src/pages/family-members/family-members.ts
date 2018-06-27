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
  is_edit: boolean;
  details: any = [];
  members :any = [];
  
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
    let id = this.navParams.get('id');
    this.is_edit = this.navParams.get('is_edit');
    if (id == undefined) {
      this.navCtrl.setRoot('FamiliesPage');
    }
  }

  ionViewWillEnter(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let id = this.navParams.get('id');
    this.user.profile(id).subscribe((resp: any) => {
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
    this.navCtrl.push('ViewMemberPage', { view_member: view_member, is_edit: this.is_edit});
  }

  gotprofileedit(id) {
    this.showLoader();
    this.navCtrl.push('ProfilePage', { id:id});
  }

  showLoader() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
  }
}
