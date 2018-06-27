import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
import { GLOBAL } from '../../app/global';
import { User } from '../../providers';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  details: any;
  district: any = [];
  taluka: any = [];
  village: any = [];
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public user: User,
    public events: Events,
    private statusBar: StatusBar) {
    this.statusBar.styleLightContent();
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }
  }

  ionViewDidLoad() {
    let id = this.navParams.get('id');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return new Promise((resolve) => {

      this.user.profile(id).subscribe((resp: any) => {
        loading.dismiss();
        if (resp.status) {
          this.details = resp.data;
          this.details.view_image = this.details.image;
          this.getdistrict();
          this.gettaluka(this.details.district);
          this.getvillage(this.details.taluka);
        }
        resolve();
      }, (err) => {
        loading.dismiss();
        resolve();
      });
    })
  }

  getdistrict() {
    this.user.district().subscribe((resp: any) => {
      if (resp.status) {
        this.district = resp.data;
      }
    }, (err) => {
    });
  }

  gettaluka(name) {
    this.taluka = this.village = [];
    this.user.taluka(name).subscribe((resp: any) => {
      if (resp.status) {
        this.taluka = resp.data;
      }
    }, (err) => {
    });
  }

  getvillage(name) {
    this.user.village(name).subscribe((resp: any) => {
      if (resp.status) {
        this.village = resp.data;
      }
    }, (err) => {
    });
  }

  gotohome() {
    this.navCtrl.setRoot('HomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  updateprofile() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.user.updateprofile(this.details).subscribe((resp: any) => {
      if (resp.status) {
        if (resp.id == GLOBAL.USER.id) {
          this.events.publish('user:loggedIn', resp.data);
          localStorage.setItem('is_loggedin', JSON.stringify(resp));
        }
        this.events.publish('user:updateprofile', resp.data);

        let toast = this.toastCtrl.create({
          message: resp.message,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  fileUpload(e) {

    if (e.target.files[0] && (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg')) {
      this.details.new_image = e.srcElement.files[0];
      var reader = new FileReader();
      let self = this;

      reader.onload = function (e) {
        self.details.view_image = reader.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    else {
      this.details.new_image = '';
      this.details.view_image = GLOBAL.USER.AVATAR;
    }
  }
}
