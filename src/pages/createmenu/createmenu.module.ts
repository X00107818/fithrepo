import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatemenuPage } from './createmenu';

@NgModule({
  declarations: [
    CreatemenuPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatemenuPage),
  ],
   exports: [
        CreatemenuPage
      ]
})
export class CreatemenuPageModule {}
