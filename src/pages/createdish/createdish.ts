import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishProvider } from '../../providers/dish/dish';
import { IngredientsProvider} from '../../providers/ingredients/ingredients';
import firebase from 'firebase/app';

/**
 * Generated class for the CreatedishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createdish',
  templateUrl: 'createdish.html',
})
export class CreatedishPage {
 
  

  constructor(public navCtrl: NavController, public navParams: NavParams,formBuilder: FormBuilder, public dishProvider: DishProvider, public ingredientProvider: IngredientsProvider)
  {
   }
     
  
  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatedishPage');
  }

}
