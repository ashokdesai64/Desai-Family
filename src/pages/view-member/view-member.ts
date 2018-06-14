import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-member',
  templateUrl: 'view-member.html',
})
export class ViewMemberPage {

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMemberPage');
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
}
