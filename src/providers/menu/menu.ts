import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase/app';
/*
  Generated class for the MenuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuProvider {
  public menuList: AngularFireList<any>;
  public userId: string;
  

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => 
      { this.userId = user.uid; 
        this.menuList = this.afDatabase.list(`/userProfile/${user.uid}/menuList`); });
  }

  getMenuList(): AngularFireList<any> { return this.menuList; }

  getDish(menuId: string): AngularFireObject<any> 
  { return this.afDatabase.object( `/userProfile/${this.userId}/dishList/${menuId}` ); 
}
createMenu(name: string, date: Date, starters: string [],mains: string[], deserts: string[]): Promise<any> 
{ const newMenuRef: firebase.database.ThenableReference = this.menuList.push( {} );
 return newMenuRef.set({name, date, starters, mains, deserts,id: newMenuRef.key }); } 


 removeMenu(menuId: string): Promise<any> { return this.menuList.remove(menuId); }

 editDish(dishId: string): Promise<any> { return 

 }
}
