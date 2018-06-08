import { Component } from '@angular/core';

/**
 * Generated class for the DesaifamilyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'desaifamily',
  templateUrl: 'desaifamily.html'
})
export class DesaifamilyComponent {

  text: string;

  constructor() {
    console.log('Hello DesaifamilyComponent Component');
    this.text = 'Hello World';
  }

}
