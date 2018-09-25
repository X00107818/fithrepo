import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishProvider } from '../../providers/dish/dish';

/**
 * Generated class for the AddIngredientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-ingredient',
  templateUrl: 'add-ingredient.html',
})
export class AddIngredientPage {

  public newIngredientForm: FormGroup;
  public ingredientList:Array<any>;

  constructor(public navCtrl: NavController,public formBuilder: FormBuilder, public navParams: NavParams, public dish: DishProvider) {

    //  "name", "calories" , "sugar" , "salt" , "fat" , "saturatedF" , "carbohydrates" , "proteins" , 
    // alergens" , "measureUnit"    
    //link user inputs to variables and validate
    this.newIngredientForm = formBuilder.group
    ({ 
    iname:  ['', Validators.required], 
    icalorie: ['', Validators.required], 
    iprotein:  ['', Validators.required], 
    icarbohydrate: ['', Validators.required], 
    ifat:  ['', Validators.required], 
    isaturated: ['', Validators.required], 
    isugar:  ['', Validators.required], 
    isalt: ['', Validators.required], 
    ialergen:  [''], 
    iunit: ['', Validators.required], 
    
  

    });
  }


  addIngredient(){
    console.log("Name from form is : "+this.newIngredientForm.value.iname +this.newIngredientForm.value.icalorie+this.newIngredientForm.value.iprotein+ this.newIngredientForm.value.icarbohydrate+this.newIngredientForm.value.ifat ,this.newIngredientForm.value.isaturated+this.newIngredientForm.value.isugar+this.newIngredientForm.value.isalt+this.newIngredientForm.value.ialergen+this.newIngredientForm.value.iunit);
    if(this.newIngredientForm.value.ialergen.lenght==0)
    {this.newIngredientForm.value.ialergen="";}
   this.dish.createIngredient(this.newIngredientForm.value.iname, this.newIngredientForm.value.icalorie, this.newIngredientForm.value.iprotein, this.newIngredientForm.value.icarbohydrate,this.newIngredientForm.value.ifat ,this.newIngredientForm.value.isaturated,this.newIngredientForm.value.isugar,this.newIngredientForm.value.isalt,this.newIngredientForm.value.ialergen,this.newIngredientForm.value.iunit);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddIngredientPage');
  }

}
