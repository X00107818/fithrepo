import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagemenuPage } from './managemenu';

@NgModule({
  declarations: [
    ManagemenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagemenuPage),
  ],
})
export class ManagemenuPageModule {}
