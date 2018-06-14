import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html',
})
export class AddMemberPage {
  base64Image: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public camera: Camera,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMemberPage');
  }

  accessGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  } 

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
