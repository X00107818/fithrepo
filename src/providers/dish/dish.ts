import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase/app';



/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {
  public dishcalories = [0,0,0,0,0,0,0];

 
  public dishList: AngularFireList<any>;  
  public ingredientList:  AngularFireList<any>;

public userId: string;
public s_ingredientCalList: any[]=[];
  public s_ingredientList: any[]=[];

  public alergenOccurence: any[]=[];
  public alergenList: any[]=[];
  public dishCalList: any[]=[];
  

  
  

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    this.s_ingredientList;
    this.s_ingredientCalList;
    this.afAuth.authState.subscribe(user => 
      { this.userId = user.uid; 
        this.dishList = this.afDatabase.list(`/userProfile/${user.uid}/dishList`); });

        this.ingredientList=this.afDatabase.list(`/Ingredients`);
       

  }

  calculateIngredientcalories(singredient){}

  getDishList(): AngularFireList<any> { return this.dishList; }

  getIngredientList(): AngularFireList<any> { return this.ingredientList; }

  getDishIngredients(dishId: string): AngularFireObject<any> 
  { return this.afDatabase.object(`/userProfile/${this.userId}/dishList/${dishId}/ingredients`); 
}

getDishCalories(dishId: string): AngularFireObject<any> 
{ return this.afDatabase.object(`/userProfile/${this.userId}/dishList/${dishId}/dishcalories`); 
}

getDishIngredientCal(dishId: string): AngularFireObject<any> 
{ return this.afDatabase.object(`/userProfile/${this.userId}/dishList/${dishId}/ingredientcalories`); 
}

getDishAlergens(dishId: string): AngularFireObject<any> 
{ return this.afDatabase.object(`/userProfile/${this.userId}/dishList/${dishId}/ingredientalergens`); 
}

getDishFullAlergenList(dishId: string): AngularFireObject<any> 
{ return this.afDatabase.object(`/userProfile/${this.userId}/dishList/${dishId}/dishalergens`); 
}

createDish( dishname: string, dishtype: string, description:string, recipe:string,dishcalories: number [],ingredientcalories:string[], dishalergens:string[],ingredientalergens:string[],ingredients:string[]): Promise<any> 
{ const newDishRef: firebase.database.ThenableReference = this.dishList.push( {} );
 return newDishRef.set({ dishname, dishtype, description, recipe,dishcalories ,ingredientcalories,dishalergens,ingredientalergens,ingredients,id: newDishRef.key }); } 

 //  "name", "calories" , "sugar" , "salt" , "fat" , "saturatedF" , "carbohydrates" , "proteins" , 
    // alergens" , "measureUnit"    
 createIngredient(name: string, calories: number, proteins:number, carbohydrates:number, fat: number ,saturatedF:number, sugar: number, salt:number, alergens:string, measureUnit:string): Promise<any> 
{ const newIngredientRef: firebase.database.ThenableReference = this.ingredientList.push( {} );
 return newIngredientRef.set({ name, calories, proteins, carbohydrates,fat ,saturatedF,sugar,salt,alergens,measureUnit }); } 

 removeDish(dishId: string): Promise<any> { return this.dishList.remove(dishId); }

 updateRecipe(dishId: string, dishrecipe:string): Promise<any>{ return  this.afDatabase.object(`/userProfile/${this.userId}/dishList/${dishId}`).update({ recipe: dishrecipe }); }
 updateDishName(dishId: string, dishname:string): Promise<any> 
{ return this.afDatabase.object(`/userProfile/${this.userId}/dishList/${dishId}`).update({ dishname: dishname });
  } 

updateIngredients(dishId, dishcalories: string [],ingredientcalories:string[], dishalergens:string[],ingredientalergens:string[],ingredients:string[]): Promise<any>
{
  return  this.afDatabase.object(`/userProfile/${this.userId}/dishList/${dishId}`).update({ dishcalories: dishcalories,ingredientcalories:ingredientcalories,dishalergens:dishalergens,ingredientalergens:ingredientalergens,ingredients:ingredients });
}  

removeIngredient(dishId,index):Promise<any>{  let ingredientList=this.afDatabase.list(`/userProfile/${this.userId}/dishList/${dishId}/ingredients/`);
return ingredientList.remove(index); }
}

