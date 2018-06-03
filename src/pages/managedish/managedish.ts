import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, ActionSheetController,Platform,Alert, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import {DishProvider} from '../../providers/dish/dish';  
import firebase from 'firebase/app';
/**
 * Generated class for the ManagedishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'dish/:dishId' 
})
@Component({
  selector: 'page-managedish',
  templateUrl: 'managedish.html',
})
export class ManagedishPage {
  public ingredientlist:Array<any>; 
  public dishId: string; 


  public ingredientList:Array<any>;
  public loadedIngredientList:Array<any>;
  public s_ingredientList;   
  public alergenList;
  public ingredientCalList;
  public fullAlergenList;
  public dishCalList;
  public ingredientRef:firebase.database.Reference;
  public dishingredientRef:firebase.database.Reference;


  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform, public dishProvider: DishProvider, public alertCtrl: AlertController, public actionCtrl: ActionSheetController) {
    
     
  }

 
  ionViewDidEnter() { this.dishId = this.navParams.get('dishId'); this.dishProvider.getDishIngredients(this.dishId).valueChanges().subscribe(ingredients=> { this.ingredientlist = ingredients; }); 
 
   this.dishProvider.getDishCalories(this.dishId).valueChanges().subscribe(dishcalories=> { this.dishCalList = dishcalories; }); 
   this.dishProvider.getDishFullAlergenList(this.dishId).valueChanges().subscribe(ingredientalergens=> { this.fullAlergenList = ingredientalergens; }); 
   this.dishProvider.getDishIngredientCal(this.dishId).valueChanges().subscribe(ingredientcalories=> { this.ingredientCalList = ingredientcalories; }); 
   this.dishProvider.getDishAlergens(this.dishId).valueChanges().subscribe(dishalergens=> { this.alergenList = dishalergens; }); 
  
 
   this.ingredientRef = firebase.database().ref('/Ingredients');
this.ingredientRef.on('value', ingredientList => {
   let ingredients = [];
   ingredientList.forEach( ingredient => {
     ingredients.push(ingredient.val());
     return false;
   });
 
    this.loadedIngredientList = ingredients;
  
 });

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
  moreIngredientOptions(singredient,ingredientCal, ingredientProteins,  ingredientCarbs,  ingredientFat,  ingredientSaturatedF,  ingredientSugar, ingredientSalt,servings,alergens,servingsize){
    let prompt = this.alertCtrl.create({
      title: 'Amount of serving',
      message: "Type amont of servings in {{data.measureUnit}}",
      inputs: [
        {
          name: 'servingsize',
          placeholder: 'Servings amount',
          value: servingsize
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

        
 this.calculateIngredientCal(singredient,ingredientCal, ingredientProteins,  ingredientCarbs,  ingredientFat,  ingredientSaturatedF,  ingredientSugar, ingredientSalt,servings,alergens,data.servingsize);
            
          }
        }
      ]
    });
    prompt.present();
  }
  

  calculateIngredientCal(singredient,ingredientCal, ingredientProteins,  ingredientCarbs,  ingredientFat,  ingredientSaturatedF,  ingredientSugar, ingredientSalt,measureUnit,alergens,servings){

 
 var ingredientCal:any;
 var ingredientProteins:any;
 var ingredientCarbs:any;
 var ingredientFat:any;
 var ingredientSaturatedF:any;
 var ingredientSugar:any;
 var ingredientSalt:any;
 
 
 
 /*declaration of ingredient unit type pulled from the database . I will eiher return slice, piece or gram */
 //const unit=this.ingredientInfo.measureUnit;
 
 if((measureUnit=="pieces" )||(measureUnit=="slices")) // if unit is slice or piece just multiply calories one by one by user input
   {
     
 
   ingredientCal= ingredientCal * servings;
   ingredientProteins=ingredientProteins * servings;
   ingredientCarbs=ingredientCarbs * servings;
   ingredientFat=ingredientFat * servings;
   ingredientSaturatedF=ingredientSaturatedF * servings;
   ingredientSugar=ingredientSugar * servings;
   ingredientSalt=ingredientSalt * servings;
 
    
   
    }
    else // else it is in grams , the value in database ar per 100 gramms each, therefore user input is devided by 100 before multiplication
    {
     
 
     ingredientCal=(servings/100) * ingredientCal ;
     ingredientProteins= (servings/100) * ingredientProteins;
     ingredientCarbs=(servings/100) * ingredientCarbs;
     ingredientFat=(servings/100) * ingredientFat;
     ingredientSaturatedF=(servings/100) * ingredientSaturatedF;
     ingredientSugar=(servings/100) * ingredientSugar;
     ingredientSalt= (servings/100) * ingredientSalt;
     
      }
 
 
     this.dishProvider.dishcalories+= ingredientCal;
     this.dishProvider.dishproteins+= ingredientProteins;
     this.dishProvider.dishcarbohydrates+=ingredientCarbs;
     this.dishProvider.dishfat+=ingredientFat;
     this.dishProvider.dishsaturatedF+=ingredientSaturatedF;
     this.dishProvider.dishsugar+=ingredientSugar;
     this.dishProvider.dishsalt+= ingredientSalt;
    /* Next storing all ingredient name and calorie values in object variable */
 const currentName =singredient;
 console.log("ingredient name is"+singredient);
 var ingredientCalValue= [ingredientCal, ingredientProteins,  ingredientCarbs,  ingredientFat,  ingredientSaturatedF,  ingredientSugar, ingredientSalt];
 /*var dishCalValues= {"cal" : dishCal,"pro": dishProteins, "carbs": dishCarbs, "fat": dishFat, "satF": dishSaturatedF, "sugar": dishSugar, "salt" : dishSalt};*/
 
 this.ingredientCalList.push(ingredientCalValue);
 
 this.ingredientlist.push(currentName);
 console.log(this.ingredientlist);
 console.log(alergens);
 this.fullAlergenList.push(alergens);
 


 
 
 /* Check for value in alergens property */
  
   if((this.alergenList.length==0)&&(alergens!= "")){
     this.alergenList.push(alergens);
     console.log("alergen has been pushed to  list"); 
   }
   else if(this.alergenList.indexOf(alergens) >-1){
   console.log("alergen is already in list");
  }
  else {
    this.alergenList.push(alergens);
    console.log("alergen has been pushed to list");
  }
/*this.dishProvider.updateIngredients();*/
  
/*increment dish calories*/


  this.dishCalList[0]+= ingredientCal;
  this.dishCalList[1]+= ingredientProteins;
  this.dishCalList[2]+= ingredientCarbs;
  this.dishCalList[3]+= ingredientFat;
  this.dishCalList[4]+= ingredientSaturatedF;
  this.dishCalList[5]+= ingredientSugar;
  this.dishCalList[6]+= ingredientSaturatedF;


 

  }

showOption(dishId:string, ingredient:string):void { let action:ActionSheet = this.actionCtrl.create({ title: 'Modify your dish',
buttons: [ // We'll add the buttons here
{
 text: 'Delete', role: 'destructive', icon: !this.platform.is('ios') ?
  'trash' : null, handler: () => { 
  let dishId=this.dishId;
  let object=this.ingredientlist;
 let index= object.indexOf(ingredient);
 
  function getKeyByValue(object, ingredient){
    return Object.keys(object).find(key => object[key] === ingredient);
  };
  let key=getKeyByValue(object, ingredient);

  console.log(key);
  console.log(index);

  /*decrementing dish calories*/
  console.log(this.dishCalList[0]);
  this.dishCalList[0]-=this.ingredientCalList[index][0];
  console.log(this.dishCalList[0]);
  this.dishCalList[1]-=this.ingredientCalList[index][1];
  this.dishCalList[2]-=this.ingredientCalList[index][2];
  this.dishCalList[3]-=this.ingredientCalList[index][3];
  this.dishCalList[4]-=this.ingredientCalList[index][4];
  this.dishCalList[5]-=this.ingredientCalList[index][5];
  this.dishCalList[6]-=this.ingredientCalList[index][6];

 

  
  if (index > -1) {
    this.ingredientCalList.splice(index,1); 
    let alergen=this.fullAlergenList[index];
    this.fullAlergenList.splice(index,1);
    if (this.fullAlergenList.indexOf(alergen)<0)
    {this.alergenList.splice(index,1)}
    object.splice(index, 1);
  } } },

  
   
] 
}); action.present(); }

updateIngredients(){
this.dishProvider.updateIngredients(this.dishId, this.dishCalList,this.ingredientCalList, this.alergenList,this.fullAlergenList,this.ingredientlist);
}

  ionViewDidLoad() {
     


}}
