import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageprofilePage } from './manageprofile';

@NgModule({
  declarations: [
    ManageprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageprofilePage),
  ],
  exports: [ ManageprofilePage]
})
export class ManageprofilePageModule {}
