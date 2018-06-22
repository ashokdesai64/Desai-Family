import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
// import { Camera } from '@ionic-native/camera';
import { GLOBAL } from '../../app/global';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html',
})
export class AddMemberPage {

  member :any ={
    name: "Test User",
    gender: "Male",
    blood_group: "O+",
    image: "",
    birthdate: "2012-05-20",
    mobile_no: "1234567890",
    email: "abc@gmail.com",
    address: "Surat Gularat",
    business: "Test",
    education: "ABC",
    relation: "Father",
    view_image: "",
    parent_id: "",
  }
  data: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public user: User, 
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController, 
    public viewCtrl: ViewController, 
    // public camera: Camera,
    ) {
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }
    this.member.parent_id = this.navParams.get('parent_id');
  }

  fileUpload(e){
   
    if (e.target.files[0] && (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg')){
      this.member.image = e.srcElement.files[0];
      var reader = new FileReader();
      let self = this;

      reader.onload = function (e) {
        self.member.view_image = reader.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    else{
      this.member.image = '';
      this.member.view_image = '';
    }
  }

  ionViewDidLoad() {
  }

  addmember(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return new Promise((resolve) => {
      this.user.addmember(this.member).subscribe((resp: any) => {
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

  // accessGallery() {
  //   this.camera.getPicture({
  //     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  //     destinationType: this.camera.DestinationType.DATA_URL
  //   }).then((imageData) => {
  //     this.member.image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     console.log(err);
  //   });
  // } 

  dismiss() {
    this.viewCtrl.dismiss(this.data);
  }
}
