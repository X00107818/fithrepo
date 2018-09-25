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
  public starterList: AngularFireList<any>;
  public userId: string;
  public starters: any[]=[];
  public mains: any[]=[];
  public desserts: any[]=[];
  

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => 
      { 
        this.userId = user.uid; 
        this.menuList = this.afDatabase.list(`/userProfile/${user.uid}/menuList`); });
       }

  getMenuList(): AngularFireList<any> { return this.menuList; }

  getMenu(menuId: string): AngularFireObject<any> 
  { 
    return this.afDatabase.object( `/userProfile/${this.userId}/dishList/${menuId}` ); 
  }


  createMenu(name: string, date: string ): Promise<any> 
   { 
      
     
     
      const newMenuRef: firebase.database.ThenableReference = this.menuList.push( {} );
     
      return newMenuRef.set({dishname:name, date: date, id: newMenuRef.key, starters: this.starters, mains: this.mains, deserts:this.desserts});
      

    } 

    updateMenu(id,starters, mains, desserts)
    {
      return this.afDatabase.object( `/userProfile/${this.userId}/menuList/${id}`).update({starters:starters, mains:mains,deserts:desserts});
    }
  pushStarters(key){
    const starters=this.starters;
    this.starterList= this.afDatabase.list(`/userProfile/${this.userId}/menuList/${key}/starters`);
    for (var i=0; i<Object.keys(starters).length; i++){
      const newStarterRef: firebase.database.ThenableReference = this.starterList.push({});
      newStarterRef.set({starters})
    }


 }   

  pushMains(key){
    const mains=this.mains;
  
  }   

   pushDesserts(key){
     const deserts=this.desserts;

  }

 removeMenu(menuId: string): Promise<any> { return this.menuList.remove(menuId); }

 updateDate(menuId: string, date:string): Promise<any>
 { return  this.afDatabase.object(`/userProfile/${this.userId}/menuList/${menuId}`).update({ date: date }); }
 updatemenuName(menuId: string, name:string): Promise<any> 
{ return this.afDatabase.object(`/userProfile/${this.userId}/menuList/${menuId}`).update({ name: name });
  } 
  getstarterDishes(menuId){
    return this.afDatabase.object(`/userProfile/${this.userId}/menuList/${menuId}/starters`);
  }

  getmainDishes(menuId){
    return this.afDatabase.object(`/userProfile/${this.userId}/menuList/${menuId}/mains`);
  }

  getdessertDishes(menuId){
    return this.afDatabase.object(`/userProfile/${this.userId}/menuList/${menuId}/deserts`);
  }

 editDish(dishId: string): Promise<any> { return 

 }
}
