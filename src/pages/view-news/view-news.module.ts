import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewNewsPage } from './view-news';

@NgModule({
  declarations: [
    ViewNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewNewsPage),
  ],
})
export class ViewNewsPageModule {}
