import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-view-gallery',
  templateUrl: 'view-gallery.html',
})
export class ViewGalleryPage {
  defaultImage = "assets/img/gallery/4.jpg";
  gallery_item = [
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/1.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/2.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/3.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/4.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/5.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/1.jpg",
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
