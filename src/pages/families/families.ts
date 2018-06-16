import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-families',
  templateUrl: 'families.html',
})
export class FamiliesPage {
  show_search = true;
  families: any;
  
  sort:string = 'asc';
  order:string = 'id';
  image_path: any;
  
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

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let param = { sort: this.sort, order: this.order };
    this.user.families(param).subscribe((resp: any) => {
      if (resp.status){
        this.families = resp.data;
        this.image_path = resp.image_path;
      }
      loading.dismiss();
    });
  }

  onInput(e){
    console.log(e.target.value);
  }
  toggleSearchbar() {
    // this.show_search = this.show_search ? false : true;
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('FamilyMembersPage', {
      item: item
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
