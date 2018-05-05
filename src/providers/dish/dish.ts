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
  public dishList: AngularFireList<any>;
public userId: string;

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
  
    this.afAuth.authState.subscribe(user => 
      { this.userId = user.uid; 
        this.dishList = this.afDatabase.list(`/userProfile/${user.uid}/dishList`); });

  }

  getDishList(): AngularFireList<any> { return this.dishList; }

  getDish(dishId: string): AngularFireObject<any> 
  { return this.afDatabase.object( `/userProfile/${this.userId}/dishList/${dishId}` ); 
}
createDish( dishname: string, dishtype: string, recipe:string,ingredients: string []): Promise<any> 
{ const newDishRef: firebase.database.ThenableReference = this.dishList.push( {} );
 return newDishRef.set({ dishname, dishtype, recipe,ingredients ,id: newDishRef.key }); } 


 removeDish(dishId: string): Promise<any> { return this.dishList.remove(dishId); }

 editDish(dishId: string): Promise<any> { return 

 }

}

