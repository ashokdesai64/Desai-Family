import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Gallery } from '../../models/gallery';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  galleries = [
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/1.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/1.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/1.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/1.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/1.jpg",
    },
    {
      "name": "Burt Bear",
      "image": "assets/img/gallery/1.jpg",
    },
  ];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar) {
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  /**
   * Navigate to the view page for this gallery.
   */
  openItem(gallery: Gallery) {
    this.navCtrl.push('ViewGalleryPage', {
      gallery: gallery
    });
  }
}
