import { NgModule } from '@angular/core';
import { IonicPageModule,IonicModule } from 'ionic-angular';
import { DishesPage } from './dishes'
import { ComponentsModule } from '../../components/components.module';

//import { ComponentsModule } from '../../components/components.module';




@NgModule({
  declarations: [
    DishesPage,
  
  
  ],
  imports: [
    IonicPageModule.forChild(DishesPage),ComponentsModule 
    
  ],
   exports: [
        DishesPage, 
        
        
      ]
})
export class DishesPageModule {}

