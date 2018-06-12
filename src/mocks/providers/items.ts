import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "image": "assets/img/speakers/bear.jpg",
    "mobile": "1234567890",
    "bloodgroup": "AB+"
  };


  constructor() {
    let items = [
      {
        "name": "Burt Bear",
        "image": "assets/img/speakers/bear.jpg",
        "mobile": "1234567890",
        "bloodgroup": "AB+"
      },
      {
        "name": "Charlie Cheetah",
        "image": "assets/img/speakers/cheetah.jpg",
        "mobile": "1234567890",
        "bloodgroup": "AB+"
      },
      {
        "name": "Donald Duck",
        "image": "assets/img/speakers/duck.jpg",
        "mobile": "1234567890",
        "bloodgroup": "AB+"
      },
      {
        "name": "Eva Eagle",
        "image": "assets/img/speakers/eagle.jpg",
        "mobile": "1234567890",
        "bloodgroup": "AB+"
      },
      {
        "name": "Ellie Elephant",
        "image": "assets/img/speakers/elephant.jpg",
        "mobile": "1234567890",
        "bloodgroup": "AB+"
      },
      {
        "name": "Molly Mouse",
        "image": "assets/img/speakers/mouse.jpg",
        "mobile": "1234567890",
        "bloodgroup": "AB+"
      },
      {
        "name": "Paul Puppy",
        "image": "assets/img/speakers/puppy.jpg",
        "mobile": "1234567890",
        "bloodgroup": "AB+"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
