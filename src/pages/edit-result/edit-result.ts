import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { GLOBAL } from '../../app/global';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-edit-result',
  templateUrl: 'edit-result.html',
})
export class EditResultPage {
  add_result: any = { view_image: '' };
  data: any;
  new_image: string;
  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController, 
    public user: User, 
    public navParams: NavParams) {
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }
  }

  ionViewWillEnter() {
    let id = this.navParams.get('id');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.user.result(id).subscribe((resp: any) => {
      if (resp.status) {
        this.add_result = resp.data;
        this.add_result.view_image = this.add_result.image;
      }
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
    });
  }

  editresult() {
    console.log(this.add_result);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return new Promise((resolve) => {
      this.user.updateresult(this.add_result).subscribe((resp: any) => {
        loading.dismiss();
        if (resp.status) {
          let toast = this.toastCtrl.create({
            message: resp.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.pop();
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

  calculateper() {
    let percentage = (parseInt(this.add_result.obtained_marks) * 100) / parseInt(this.add_result.total_marks);
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
}
