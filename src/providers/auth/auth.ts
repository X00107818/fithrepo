
 import { Injectable } from '@angular/core';
 import { AngularFireAuth } from 'angularfire2/auth';
 import { AngularFireDatabase } from 'angularfire2/database';
 import * as firebase from 'firebase/app'; 



@Injectable()
export class AuthProvider {

  constructor( public afAuth: AngularFireAuth,public afDatabase: AngularFireDatabase) {
   
  }

  //tet current user
  getUser(): firebase.User { return this.afAuth.auth.currentUser; }

  sendEmailVerification() {

    this.afAuth.authState.subscribe(user => {
  
        user.sendEmailVerification()
  
        .then(() => {
  
          console.log('email sent');
  
        })
  
      });}

   //login function   

  loginUser(newEmail: string, newPassword: string): Promise<any>
   { 
     return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
   } 

   //register function

   register(email: string, password: string): Promise<any>
  {
   return this.afAuth.auth.createUserWithEmailAndPassword(email,password) 
  .then
   ( user => { this.afDatabase.object(`/userProfile/${user.uid}`).update({ email: email })
   .then(() => {this.sendEmailVerification();})  ; }, 
   error => { console.log('There was an error creating the account', error); } ); 
  }


   resetPassword(email: string): Promise<any> { return this.afAuth.auth.sendPasswordResetEmail(email); }

   //singn out

   logoutUser(): Promise<void> 
   {

  return this.afAuth.auth.signOut();

   }


}

