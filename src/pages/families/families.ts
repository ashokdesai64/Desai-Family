import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { User } from '../../providers';
import { GLOBAL } from '../../app/global';

@IonicPage()
@Component({
  selector: 'page-families',
  templateUrl: 'families.html',
})
export class FamiliesPage {
  show_search = true;
  families: any;
  
  page:number = 1;
  sort:string = 'asc';
  order:string = 'id';
  totalpage: number = 0;
  search: string = '';
  
  constructor(
    public navCtrl: NavController,
    public user: User,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private statusBar: StatusBar
  ) {
    this.statusBar.styleLightContent();
  }

  ionViewCanEnter() {
    if (GLOBAL.IS_LOGGEDIN === false) {
      this.navCtrl.setRoot('LoginPage');
    }
  }
  
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let param = { page: this.page, sort: this.sort, order: this.order, s: this.search};
    this.user.families(param).subscribe((resp: any) => {
      if (resp.status){
        this.families = resp.data;
        this.totalpage = resp.totalpage;
        this.page++;

      }
      loading.dismiss();
    },(err) => {
      loading.dismiss();
    });
  }

  doInfinite(): Promise<any> {
    // console.log('totalpage::' + this.totalpage,'page::'+this.page)
      return new Promise((resolve) => {
        let param = { page: this.page, sort: this.sort, order: this.order, s: this.search };
        this.user.families(param).subscribe((resp: any) => {
          if (resp.status) {
            for (var i = 0; i < resp.data.length; i++) {
              this.families.push(resp.data[i]);
            }
              this.page++;
            }
            resolve();
          }, (err) => {
            resolve();
          });
      })
  }

  onInput(e) : Promise<any>{
    this.search = e.target.value != undefined ? e.target.value:'';
    return new Promise((resolve) => {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.page       = 1;
      this.totalpage  = 0;
      let param = { page: this.page, sort: this.sort, order: this.order, s: this.search };
      this.user.families(param).subscribe((resp: any) => {
        if (resp.status) {
          this.families   = resp.data;
          this.totalpage  = resp.totalpage;
          this.page++;
        }
        loading.dismiss();
        resolve();
      }, (err) => {
        loading.dismiss();
        this.families = [];
        resolve();
      });
    })
  }

  gotofamilymembers(family) {
    this.navCtrl.push('FamilyMembersPage', {
      family: family
    });
  }

  sortby() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Sort By');
    let selected = this.order + '-' + this.sort;
    alert.addInput({ type: 'radio', label: 'Default', value: 'id-asc', checked: (selected == 'id-asc'?true:false) });
    alert.addInput({ type: 'radio', label: 'Latest', value: 'id-desc', checked: (selected == 'id-desc' ? true : false) });
    alert.addInput({ type: 'radio', label: 'Name ASC', value: 'name-asc', checked: (selected == 'name-asc' ? true : false) });
    alert.addInput({ type: 'radio', label: 'Name DESC', value: 'name-desc', checked: (selected == 'name-desc' ? true : false) });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        let sort = data.split('-');
        
        this.page = 1;
        this.totalpage  = 0;

        this.order = sort[0]
        this.sort = sort[1];
        this.ionViewDidLoad();
      }
    });
    alert.present();
  }

  filterby() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filter By');
    alert.addInput({ type: 'checkbox', label: 'Name ASC', value: 'name', checked: false });
    alert.addInput({ type: 'checkbox', label: 'DOB ASC', value: 'dob', checked: false });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
      }
    });
    alert.present();
  }
}
