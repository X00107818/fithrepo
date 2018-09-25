import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddIngredientPage } from './add-ingredient';

@NgModule({
  declarations: [
    AddIngredientPage,
  ],
  imports: [
    IonicPageModule.forChild(AddIngredientPage),
  ],
})
export class AddIngredientPageModule {}
