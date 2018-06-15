import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-family-members',
  templateUrl: 'family-members.html',
})
export class FamilyMembersPage {
  currentItems = [
  {
    "name": "Burt Bear",
    "image": "assets/img/speakers/bear.jpg",
    "mobile": "9898989898",
    "bloodgroup": "A"
  },
  {
    "name": "Burt Bear",
    "image": "assets/img/speakers/bear.jpg",
    "mobile": "9898989898",
    "bloodgroup": "A"
  },
  {
    "name": "Burt Bear",
    "image": "assets/img/speakers/bear.jpg",
    "mobile": "9898989898",
    "bloodgroup": "A"
  },
  {
    "name": "Burt Bear",
    "image": "assets/img/speakers/bear.jpg",
    "mobile": "9898989898",
    "bloodgroup": "A"
  },
  {
    "name": "Burt Bear",
    "image": "assets/img/speakers/bear.jpg",
    "mobile": "9898989898",
    "bloodgroup": "A"
  },
  {
    "name": "Burt Bear",
    "image": "assets/img/speakers/bear.jpg",
    "mobile": "9898989898",
    "bloodgroup": "A"
  },
  ];
  details :any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    private statusBar: StatusBar) {
    this.statusBar.styleLightContent();
    this.details = navParams.get('item');
    console.log(this.details);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FamilyMembersPage');
    console.log(this.details);
  }

  AddMemberModal() {
    let modal = this.modalCtrl.create('AddMemberPage');
    modal.present();
  } 

  gotoviewmember() {
    this.navCtrl.push('ViewMemberPage');
  }

  gotProfileedit() {
    this.navCtrl.push('ProfilePage');
  }
}
