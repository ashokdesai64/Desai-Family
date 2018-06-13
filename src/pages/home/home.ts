import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  slides: {};
  constructor(public navCtrl: NavController, public platform: Platform, public menuCtrl: MenuController) {

    this.slides = [
      {
        title: 'TUTORIAL_SLIDE1_TITLE',
        description: 'TUTORIAL_SLIDE1_DESCRIPTION',
        image: 'assets/img/slider/1.jpg',
      },
      {
        title: 'TUTORIAL_SLIDE2_TITLE',
        description: 'TUTORIAL_SLIDE2_DESCRIPTION',
        image: 'assets/img/slider/2.jpg',
      },
      {
        title: 'TUTORIAL_SLIDE3_TITLE',
        description: 'TUTORIAL_SLIDE3_DESCRIPTION',
        image: 'assets/img/slider/3.jpg',
      }
    ];

  }

  ionViewDidLoad() {
    // this.menuCtrl.enable(false);
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
  
  gotonotifications() {
    this.navCtrl.push('NotificationsPage');
  }
}
