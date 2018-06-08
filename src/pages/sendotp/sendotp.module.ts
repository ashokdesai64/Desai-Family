import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendotpPage } from './sendotp';

@NgModule({
  declarations: [
    SendotpPage,
  ],
  imports: [
    IonicPageModule.forChild(SendotpPage),
  ],
})
export class SendotpPageModule {}
