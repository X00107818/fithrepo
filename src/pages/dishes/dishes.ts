import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheet, ActionSheetController,Platform, Alert,AlertController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../../providers/dish/dish';


/**
 * Generated class for the DishesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishes',
  templateUrl: 'dishes.html',
})
export class DishesPage {

public dishList: Observable<any>;

  constructor( public navCtrl: NavController, public navParams: NavParams,public platform: Platform, public dishProvider: DishProvider,public actionCtrl: ActionSheetController, public alertCtrl: AlertController) 
  {}

   

  moreDishOptions(dishId:string, dishname:string,dishrecipe:string):void { let action:ActionSheet = this.actionCtrl.create({ title: 'Modify your dish',
   buttons: [ // We'll add the buttons here
   {
    text: 'Delete', role: 'destructive', icon: !this.platform.is('ios') ?
     'trash' : null, handler: () => { this.dishProvider.removeDish(dishId); } },

    {
      text: 'Update list of ingredients', icon: !this.platform.is('ios') ? 
      'play' : null, handler: () => { this.navCtrl.push('ManagedishPage', { dishId: dishId }); } },

    {
      text: 'Update recipe field', icon: !this.platform.is('ios') ?
         'checkmark' : null, handler: () => { this.updateRecipe(dishId,dishrecipe); } }, 

    {
       text: 'Update dish Name field', icon: !this.platform.is('ios') ?
           'checkmark' : null, handler: () => { this.updatedishName(dishId,dishname); } },    
      
   ] 
}); action.present(); }


updatedishName(dishId, dishname){
  let prompt = this.alertCtrl.create({
    title: 'Dish Name',
    message: "Update the name for dish",
    inputs: [
      {
        name: 'dishname',
        placeholder: 'Dish Name',
        value: dishname
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log(data.dishname);
          this.dishProvider.updateDishName(dishId, data.dishname);

        }
      }
    ]
  });
  prompt.present();
}

updateRecipe(dishId, recipe){
  let prompt = this.alertCtrl.create({
    title: 'Dish Recipe',
    message: "Update recipe for dish",
    inputs: [
      {
        name: 'dishrecipe',
        placeholder: 'Dish Recipe',
        value: recipe
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log(data.recipe);
          this.dishProvider.updateRecipe(dishId, data.recipe);

        }
      }
    ]
  });
  prompt.present();
}
 

  ionViewDidLoad() {
    this.dishList = this.dishProvider.getDishList().valueChanges();
    console.log(this.dishList);

  }

}
