import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getNavByIdOrName } from 'ionic-angular/components/app/app';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DishProvider } from '../../providers/dish/dish';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase/app';
import { HomePage } from '../home/home';
import { Searchbar } from 'ionic-angular/components/searchbar/searchbar';
import { variable } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the IngredientdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingredientdetails',
  templateUrl: 'ingredientdetails.html',
})
export class IngredientdetailsPage {
  public calculate : FormGroup;
  ingredientInfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder ,public dish: DishProvider, public afAuth: AngularFireAuth) {
    this.ingredientInfo=this.navParams.data;
    this.calculate = formBuilder.group({
    servingsize: ['', Validators.required]
    
   });
   
   }

   addIngredient()
{
this.navCtrl.push('CreatedishPage');
}

saveForm(servings) {
  /*user input of serving size ie how much of grams/slices/pieces */
servings= this.calculate.value.servingsize; 

/*declaration of alergens value for selected ingredient*/

var alergen=this.ingredientInfo.alergens;
  
  
 /* declaration of Ingredient calorie values from db */
const calories: number = this.ingredientInfo.calories; 
const proteins: number= this.ingredientInfo.proteins;
const carbohydrates: number= this.ingredientInfo.carbohydrates;
const fat: number= this.ingredientInfo.fat;
const saturatedF: number= this.ingredientInfo.saturatedF;
const sugar: number= this.ingredientInfo.sugar;
const salt: number= this.ingredientInfo.salt;
const seasonality=this.ingredientInfo.seasonality;



/*declaration of total ingredient calorie value for selected ingredient */
var ingredientCal:number;var ingredientProteins:number;var ingredientCarbs:number;var ingredientFat:number;var ingredientSaturatedF:number;var ingredientSugar:number;
var ingredientSalt: number;



/*declaration of ingredient unit type pulled from the database . I will eiher return slice, piece or gram */
const unit=this.ingredientInfo.measureUnit;

if((unit=="pieces" )||(unit=="slices")) // if unit is slice or piece just multiply calories one by one by user input
  {
    

  ingredientCal= calories * servings;
  ingredientProteins=proteins *servings;
  ingredientCarbs=carbohydrates *servings;
  ingredientFat=fat * servings;
  ingredientSaturatedF=saturatedF *servings;
  ingredientSugar=sugar *servings;
  ingredientSalt=salt *servings;

   
  
   }
   else // else it is in grams , the value in database ar per 100 gramms each, therefore user input is devided by 100 before multiplication
   {
    

    ingredientCal=(servings/100) * calories ;
    ingredientProteins= (servings/100)* proteins;
    ingredientCarbs=(servings/100) *carbohydrates;
    ingredientFat=(servings/100) *fat;
    ingredientSaturatedF=(servings/100) *saturatedF;
    ingredientSugar=(servings/100) *sugar;
    ingredientSalt= (servings/100)*salt;
    
     }


    this.dish.dishcalories+= ingredientCal;
     
    this.dish.dishproteins+= ingredientProteins;
    this.dish.dishcarbohydrates+=ingredientCarbs;
    this.dish.dishfat+=ingredientFat;
    this.dish.dishsaturatedF+=ingredientSaturatedF;
    this.dish.dishsugar+=ingredientSugar;
    this.dish.dishsalt+= ingredientSalt;
   /* Next storing all ingredient name and calorie values in object variable */
const currentName =this.ingredientInfo.name;
var ingredientCalValue= [ingredientCal, ingredientProteins,  ingredientCarbs,  ingredientFat,  ingredientSaturatedF,  ingredientSugar, ingredientSalt];
/*var dishCalValues= {"cal" : dishCal,"pro": dishProteins, "carbs": dishCarbs, "fat": dishFat, "satF": dishSaturatedF, "sugar": dishSugar, "salt" : dishSalt};*/

this.dish.s_ingredientCalList.push(ingredientCalValue);

this.dish.s_ingredientList.push(currentName);
this.dish.alergenFullList.push(alergen);

console.log(this.dish.alergenFullList);
console.log(this.dish.s_ingredientList);
console.log(this.dish.dishCalList);
console.log(this.dish.s_ingredientCalList);
console.log(this.dish.s_ingredientCalList[0][0]);
/*console.log(this.dish.s_ingredientCalList[j][currentName].cal);*/


/* Check for value in alergens property */
 
  if((this.dish.alergenList.length==0)&&(alergen!= "")){
    this.dish.alergenList.push(alergen);
    console.log("alergen has been pushed to  list");  console.log(this.dish.alergenList);
  }
  else if(this.dish.alergenList.indexOf(alergen) >-1){
  console.log("alergen is already in list");
  console.log(this.dish.alergenList.indexOf(alergen)); console.log(this.dish.alergenList);

}
 
 /*checking if ingredient is seasonal*/
if ((seasonality.indexOf("summer") >-1)||(seasonality=="all")) {
 console.log("Ingredient is seasnal in summer ");
}



}

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngredientdetailsPage');
  }

}
