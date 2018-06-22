import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
// import { Camera } from '@ionic-native/camera';
import { GLOBAL } from '../../app/global';
import { User } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-edit-member',
  templateUrl: 'edit-member.html',
})
export class EditMemberPage {

  edit_member: any = {};
  data: any;
  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public loadingCtrl: LoadingController, 
    public user: User, 
    // public camera: Camera,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }
    this.edit_member = this.navParams.get('edit_member');
    this.edit_member.old_image = this.edit_member.image;
    console.log(this.edit_member);
  }
  
  ionViewDidLoad() {
  }

  editmember() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return new Promise((resolve) => {
      this.user.editmember(this.edit_member).subscribe((resp: any) => {
        loading.dismiss();
        if (resp.status) {
          this.data = resp.data;
          this.dismiss();
          let toast = this.toastCtrl.create({
            message: resp.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        resolve();
      }, (err) => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: err.error.message,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        resolve();
      });
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();

  }

  fileUpload(e) {

    if (e.target.files[0] && (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg')) {
      this.edit_member.image = e.srcElement.files[0];
      var reader = new FileReader();
      let self = this;

      reader.onload = function (e) {
        self.edit_member.view_image = reader.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    else {
      // this.edit_member.image = '';
      // this.edit_member.view_image = '';
    }
    console.log(this.edit_member.image);
  }
  
  // chooseImg(){
  //   this.camera.getPicture({
  //     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  //     destinationType: this.camera.DestinationType.DATA_URL
  //   }).then((imageData) => {
  //     this.base64Image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
}
