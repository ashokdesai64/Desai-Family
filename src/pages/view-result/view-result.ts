import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../providers';
import { GLOBAL } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-view-result',
  templateUrl: 'view-result.html',
})
export class ViewResultPage {
  view_result: any;

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    public user: User, 
    public alertCtrl: AlertController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewResultPage');
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
        this.view_result = resp.data;
      }
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
    });
  }
  
  deleteresult(id) {

    let alert = this.alertCtrl.create({
      // title: 'Confirm delete',
      message: 'Are you sure you want to delete this result?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            loading.present();
            this.user.deleteresult({ id: id }).subscribe((resp: any) => {
              if (resp.status) {
                this.navCtrl.setRoot('ResultsPage');
              }
              loading.dismiss();
            }, (err) => {
              loading.dismiss();
            });
          }
        }
      ]
    });
    alert.present();
  }
  
}
