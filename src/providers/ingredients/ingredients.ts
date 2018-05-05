import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList   } from 'angularfire2/database';
import firebase from 'firebase';


import {Http} from '@angular/http';



/*
  Generated class for the IngredientsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class IngredientsProvider  {



  public loadedIngredientList:Array<any>;
  public ingredientRef:firebase.database.Reference;
  public ingredientList: Array<any>;

  constructor(public afDatabase: AngularFireDatabase) {
    this.ingredientRef = firebase.database().ref('/Ingredients');
  
    this.ingredientRef.on('value', ingredientList => {
  let ingredients = [];
  ingredientList.forEach( ingredient => {
    ingredients.push(ingredient.val());
    return false;
  });
  
  this.loadedIngredientList = ingredients;
 this.ingredientList= ingredients;});
}
initializeItems(): void {
  this.ingredientList = this.loadedIngredientList;
}



   }


