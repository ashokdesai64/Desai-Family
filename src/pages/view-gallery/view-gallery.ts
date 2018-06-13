import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-view-gallery',
  templateUrl: 'view-gallery.html',
})
export class ViewGalleryPage {
  gallery_item = [
    {
      "name": "Burt Bear",
      "image": "assets/img/speakers/bear.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/speakers/bear.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/speakers/bear.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/speakers/bear.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/speakers/bear.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/speakers/bear.jpg",
    },
  ];
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar) {
    this.item = navParams.get('gallery');
    console.log(this.item);
    this.statusBar.styleLightContent();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewGalleryPage');
  }

}
