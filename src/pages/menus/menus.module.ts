import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenusPage } from './menus';

import { ComponentsModule } from '../../components/components.module';
//import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    MenusPage
    //ComponentsModule
    //ExpandableComponent
  ],
  imports: [
    IonicPageModule.forChild(MenusPage),ComponentsModule
  ],
   exports: [
        MenusPage
      ]
})
export class MenusPageModule {}
