import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagedishPage } from './managedish';

@NgModule({
  declarations: [
    ManagedishPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagedishPage),
  ],
})
export class ManagedishPageModule {}
