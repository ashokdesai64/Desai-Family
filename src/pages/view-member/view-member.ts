import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-member',
  templateUrl: 'view-member.html',
})
export class ViewMemberPage {

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMemberPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
