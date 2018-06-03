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
  public dishcalories: number=0;
  public dishproteins: number=0;
  public dishcarbohydrates: number=0;
  public dishsalt: number=0;
  public sugarsugar: number=0;
  public dishfat: number=0;
  public dishsaturatedF: number=0;
  public dishsugar:number=0;
  public dishList: AngularFireList<any>;

public userId: string;
public s_ingredientCalList: any[]=[];
  public s_ingredientList: any[]=[];
  public alergenFullList: any[]=[];
  public alergenList: any[]=[];
  public dishCalList: any[]=[];
  

  
  

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    this.s_ingredientList;
    this.s_ingredientCalList;
    this.afAuth.authState.subscribe(user => 
      { this.userId = user.uid; 
        this.dishList = this.afDatabase.list(`/userProfile/${user.uid}/dishList`); });
       

  }

  calculateIngredientcalories(singredient){}

  getDishList(): AngularFireList<any> { return this.dishList; }

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

createDish( dishname: string, dishtype: string, description:string, recipe:string,dishcalories: string [],ingredientcalories:string[], dishalergens:string[],ingredientalergens:string[],ingredients:string[]): Promise<any> 
{ const newDishRef: firebase.database.ThenableReference = this.dishList.push( {} );
 return newDishRef.set({ dishname, dishtype, description, recipe,dishcalories ,ingredientcalories,dishalergens,ingredientalergens,ingredients,id: newDishRef.key }); } 


 removeDish(dishId: string): Promise<any> { return this.dishList.remove(dishId); }

 updateRecipe(dishId: string, dishrecipe:string): Promise<any>{ return  this.afDatabase.object(`/userProfile/${this.userId}/dishList/${dishId}`).update({ recipe: dishrecipe }); }
 updateDishName(dishId: string, dishname:string): Promise<any> 
{ return this.afDatabase.object(`/userProfile/${this.userId}/dishList/${dishId}`).update({ dishname: dishname });
  } 

updateIngredients(){}  

removeIngredient(dishId,index):Promise<any>{  let ingredientList=this.afDatabase.list(`/userProfile/${this.userId}/dishList/${dishId}/ingredients/`);
return ingredientList.remove(index); }
}

