

import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase/app';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  
public profileList: AngularFireObject<any>;
public usersList: AngularFireObject<any>;
public userId: string;


  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase ) 
  {
    this.afAuth.authState.subscribe
    (user => { this.userId = user.uid; this.profileList = this.afDatabase.object(`userProfile/${this.userId}`);});
  } 
 
  getProfileList(): AngularFireObject<any> { return this.profileList; }

  getProfile(): AngularFireObject<any> 
  { return this.afDatabase.object(`/userProfile/${this.userId}`); 
}


createProfile( firstname: string, lastname: string, uname: string, isadmin: boolean=true ): Promise<any> 
{ return this.afDatabase.object(`/userProfile/${this.userId}`).update({ firstname: firstname,lastname: lastname,uname: uname,isadmin:isadmin })
  } 


updateUname(uname: string): Promise<any> 
{ return this.afDatabase.object(`/userProfile/${this.userId}`).update({ uname: uname })
  } 

 createadminProfile( orgname:string, firstname: string=null, lastname: string, isadmin: boolean = true ): Promise<any> 

 { return this.afDatabase.object(`/userProfile/${this.userId}`).update({ firstname: firstname,lastname: lastname,isadmin:isadmin })
}



changePermission(profileId: string): Promise<any> {
  if (this.profileList.set({ isadmin: true }) )
   {return this.profileList.update({ isadmin: false });}
else {
  return this.profileList.update( { paid: true }); 
} } 
} 