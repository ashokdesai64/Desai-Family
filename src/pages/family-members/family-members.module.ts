import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamilyMembersPage } from './family-members';

@NgModule({
  declarations: [
    FamilyMembersPage,
  ],
  imports: [
    IonicPageModule.forChild(FamilyMembersPage),
  ],
})
export class FamilyMembersPageModule {}
