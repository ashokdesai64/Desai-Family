import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-families',
  templateUrl: 'families.html',
})
export class FamiliesPage {
  show_search = true;
  showCancelButton = false;
  currentItems: Item[];
  selectOptions = {
    title: 'Sort By',
    // subTitle: 'Select your toppings',
    mode: 'md'
  };
  constructor(
    public navCtrl: NavController,
    public items: Items,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private statusBar: StatusBar
  ) {
    this.currentItems = this.items.query();
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FamiliesPage');
  }
  onInput(e){
    console.log(e.target.value);
  }
  onCancel() {
    // this.show_search = this.show_search ? false : true;
  }

  toggleSearchbar() {
    // this.show_search = this.show_search ? false : true;
  }
  
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
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
    alert.addInput({ type: 'radio', label: 'Name ASC', value: 'name-asc', checked: false });
    alert.addInput({ type: 'radio', label: 'Name DESC', value: 'name-desc', checked: true });
    alert.addInput({ type: 'radio', label: 'DOB ASC', value: 'dob-asc', checked: false });
    alert.addInput({ type: 'radio', label: 'DOB DESC', value: 'dob-desc', checked: false });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
        // this.testRadioOpen = false;
        // this.testRadioResult = data;
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
