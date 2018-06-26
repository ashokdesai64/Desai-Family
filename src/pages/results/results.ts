import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { GLOBAL } from '../../app/global';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  results: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public user: User, 
    public loadingCtrl: LoadingController,) {
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }
  }
  
  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.user.results(GLOBAL.USER.id).subscribe((resp: any) => {
        if (resp.status) {
          this.results = resp.data;
        }
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
      });
  }

  deleteresult(item) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (this.results) {
      this.user.deleteresult({ id: item.id }).subscribe((resp: any) => {
        if (resp.status) {
          this.results.splice(this.results.indexOf(item), 1);
        }
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
      });
    }
  }

  gotoresult() {
    this.showLoader();
    this.navCtrl.push('ResultPage');
  }

  showLoader() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
  }

}
