import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-edit-member',
  templateUrl: 'edit-member.html',
})
export class EditMemberPage {
  base64Image: any;
  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public camera: Camera,
    public navParams: NavParams) {
    this.base64Image = '../assets/img/girl-avatar.png';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMemberPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  chooseImg(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }
}
