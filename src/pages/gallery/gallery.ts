import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  galleries = [
    {
      "id": "1",
      "name": "Event 2014",
      "image": "assets/img/gallery/1.jpg",
      "count": "5",
    },
    {
      "id": "2",
      "name": "Event 2015",
      "image": "assets/img/gallery/1.jpg",
      "count": "5",
    },
    {
      "id": "3",
      "name": "Event 2016",
      "image": "assets/img/gallery/1.jpg",
      "count": "5",
    },
    {
      "id": "4",
      "name": "Event 2017",
      "image": "assets/img/gallery/1.jpg",
      "count": "5",
    },
    {
      "id": "5",
      "name": "Event 2018",
      "image": "assets/img/gallery/1.jpg",
      "count": "5",
    },
    {
      "id": "6",
      "name": "Event 2019",
      "image": "assets/img/gallery/1.jpg",
      "count": "5",
    },
  ];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar) {
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  gotoviewgallery(gallery) {
    this.navCtrl.push('ViewGalleryPage', {
      gallery: gallery
    });
  }
}
