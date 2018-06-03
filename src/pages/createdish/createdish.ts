import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishProvider } from '../../providers/dish/dish';

import firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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
 
  public newDishForm: FormGroup;
  public ingredientList:Array<any>;
  public loadedIngredientList:Array<any>;
  public s_ingredientList= this.dish.s_ingredientList;   
  public alergenList=this.dish.alergenList;
  public ingredientCalList=this.dish.s_ingredientCalList;
 

  public dishcal= this.dish.dishcalories.toFixed(2);
  public dishproteins=this.dish.dishproteins.toFixed(2);
  public dishfat=this.dish.dishfat.toFixed(2);
  public dishsatf=this.dish.dishsaturatedF.toFixed(2);
  public dishsalt=this.dish.dishsalt.toFixed(2);
  public dishsugar=this.dish.dishsugar.toFixed(2);
  public dishcarbs=this.dish.dishcarbohydrates.toFixed(2);
  public ingredientRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams,formBuilder: FormBuilder, public dish: DishProvider,public afdb:AngularFireDatabase, public afAuth: AngularFireAuth,)
  {
    this.newDishForm = formBuilder.group
    ({ 
    dname: ['', Validators.required],
    dtype: ['', Validators.required], 
    description: ['', Validators.required], 
    recipe: ['', Validators.required]
  

});

this.ingredientRef = firebase.database().ref('/Ingredients');
this.ingredientRef.on('value', ingredientList => {
   let ingredients = [];
   ingredientList.forEach( ingredient => {
     ingredients.push(ingredient.val());
     return false;
   });
 
    this.loadedIngredientList = ingredients;
  
 });


   }

   initializeItems(): void {
    this.ingredientList = this.loadedIngredientList;
  }
  
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.ingredientList = this.ingredientList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.ingredientList.length);
  
  }
  
  ingredientSelected(singredient) {
   this.navCtrl.push('IngredientdetailsPage',singredient);
  }
  
  
  editS_ingredient(singredient){
                  
                          
                            }
  
  deleteS_ingredient(singredient){
   
            let index = this.dish.s_ingredientList.indexOf(singredient);
     
            if(index > -1){
               
               console.log("dishcalories before" +this.dish.dishcalories);
               console.log(this.dish.s_ingredientCalList[index][0]);
                this.dish.dishcalories-= this.dish.s_ingredientCalList[index][0];
                this.dishcal=this.dish.dishcalories.toFixed(2);
                
                this.dish.dishproteins-= this.dish.s_ingredientCalList[index][1];
                this.dishproteins=this.dish.dishproteins.toFixed(2);
               
                this.dish.dishcarbohydrates-= this.dish.s_ingredientCalList[index][2];
                this.dishcarbs=this.dish.dishcarbohydrates.toFixed(2);
               
                this.dish.dishfat-= this.dish.s_ingredientCalList[index][3];
                this.dishfat=this.dish.dishfat.toFixed(2);
              
                this.dish.dishsaturatedF-= this.dish.s_ingredientCalList[index][4];
                this.dishsatf=this.dish.dishsaturatedF.toFixed(2);
               
                
                this.dish.dishsugar-= this.dish.s_ingredientCalList[index][5];
                this.dishsugar=this.dish.dishsugar.toFixed(2);
                
                this.dish.dishsalt-= this.dish.s_ingredientCalList[index][6];
                this.dishsalt=this.dish.dishsalt.toFixed(2);

                console.log("dishcalories after decrement" +this.dish.dishcalories);
                
                let alergenValue=this.dish.alergenFullList[index];
                console.log(this.dish.alergenFullList);
                console.log(alergenValue);
                this.dish.alergenFullList.splice(index, 1);
                console.log(this.dish.alergenFullList);

                if((alergenValue!="")&&(this.dish.alergenFullList.indexOf(alergenValue)<0))
                {let deletealergen=this.dish.alergenList.indexOf(alergenValue);
                this.dish.alergenList.splice(deletealergen, 1);
                console.log("Deleted non existing alergent"+this.dish.alergenList);
                }


           
                this.dish.s_ingredientList.splice(index, 1);
              }}
  
      createDish(){
        console.log("dishname is:"+this.newDishForm.value.dname+ "dish type is:"+this.newDishForm.value.dtype+ "dish recipe is:"+this.newDishForm.value.recipe+"incremented proteins:"+this.dishproteins);
        this.dish.createDish(this.newDishForm.value.dname,this.newDishForm.value.dtype,this.newDishForm.value.description,this.newDishForm.value.recipe,[this.dishcal,this.dishcarbs,this.dishfat,this.dishsatf,this.dishproteins,this.dishsalt,this.dishsugar],this.dish.s_ingredientCalList, this.dish.alergenList,this.dish.alergenFullList,this.dish.s_ingredientList);
      }
  
     
  
  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatedishPage');
  }

}
