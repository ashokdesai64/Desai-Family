import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FamilyMembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FamilyMembersPage');
  }

}
