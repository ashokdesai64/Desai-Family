import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
// import { Camera } from '@ionic-native/camera';
import { GLOBAL } from '../../app/global';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  add_result: any = { 
    userid:GLOBAL.USER.id,
    view_image:"",
    image:"",
    name:"",
    standard:"",
    total_marks:"",
    obtained_markes:"",
    passing_year:"",
    percentage:"",
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public user: User,
    public events: Events,
    // public camera: Camera,
  ) {
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }
  }
  
  ionViewDidLoad() {
  }

  addresult(){
    console.log(this.add_result);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return new Promise((resolve) => {
      this.user.addresult(this.add_result).subscribe((resp: any) => {
        loading.dismiss();
        if (resp.status) {
          this.events.publish('user:addresult', resp);
          let toast = this.toastCtrl.create({
            message: resp.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();

          this.add_result =  { userid: GLOBAL.USER.id, view_image: "", image: "", name: "", standard: "", total_marks: "", obtained_markes: "", passing_year: "", percentage: "", };
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

  calculateper(){
    let percentage = (parseInt(this.add_result.obtained_markes) * 100) / parseInt(this.add_result.total_marks);
    this.add_result.percentage = isNaN(percentage) ? '' : percentage.toFixed(2);
  }

  fileUpload(e) {
    if (e.target.files[0] && (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg')) {
      this.add_result.image = e.srcElement.files[0];
      var reader = new FileReader();
      let self = this;

      reader.onload = function (e) {
        self.add_result.view_image = reader.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    else {
      this.add_result.view_image = "";
    }
  }

  // accessGallery() {
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
