import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamiliesPage } from './families';

@NgModule({
  declarations: [
    FamiliesPage,
  ],
  imports: [
    IonicPageModule.forChild(FamiliesPage),
  ],
})
export class FamiliesPageModule {}
