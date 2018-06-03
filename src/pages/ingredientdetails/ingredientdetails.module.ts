import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngredientdetailsPage } from './ingredientdetails';

@NgModule({
  declarations: [
    IngredientdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(IngredientdetailsPage),
  ],
  exports: [IngredientdetailsPage]
})
export class IngredientdetailsPageModule {}
