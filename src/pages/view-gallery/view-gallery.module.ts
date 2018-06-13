import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewGalleryPage } from './view-gallery';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    ViewGalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewGalleryPage),
    IonicImageLoader,
  ],
})
export class ViewGalleryPageModule {}
