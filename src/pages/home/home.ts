import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  slides: {};
  constructor(public navCtrl: NavController, public platform: Platform) {

    this.slides = [
      {
        title: 'TUTORIAL_SLIDE1_TITLE',
        description: 'TUTORIAL_SLIDE1_DESCRIPTION',
        image: 'assets/img/advance-card-tmntr.jpg',
      },
      {
        title: 'TUTORIAL_SLIDE2_TITLE',
        description: 'TUTORIAL_SLIDE2_DESCRIPTION',
        image: 'assets/img/advance-card-tmntr.jpg',
      },
      {
        title: 'TUTORIAL_SLIDE3_TITLE',
        description: 'TUTORIAL_SLIDE3_DESCRIPTION',
        image: 'assets/img/advance-card-bttf.png',
      }
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  gotofamilies(){
    this.navCtrl.push('FamiliesPage');
  }
  
  gotoabout(){
    this.navCtrl.push('AboutFamilyPage');
  }

  gotogallery() {
    this.navCtrl.push('GalleryPage');
  }

  gotonews() {
    this.navCtrl.push('NewsPage');
  }
}
