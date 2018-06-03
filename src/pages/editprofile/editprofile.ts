import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, ActionSheetController, Platform, Alert, AlertController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase/app';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  
  
   userId:string ;

   
   public user= {};


  
  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, public profileProvider: ProfileProvider, public actionCtrl: ActionSheetController, public platform: Platform, public alertCtrl: AlertController,public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase
  ) {
    
      this.userId= this.profileProvider.userId;
      this.plt.ready().then((readySource) => {
        console.log('Platform ready from', readySource);
        
      });
         
    
    }

    showOptions(uname) {
      let actionSheet = this.actionCtrl.create({
        title: 'What do you want to do?',
        buttons: [
         
         {
            text: 'Update username',
            handler: () => {
              this.updateUname(uname);
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }


    updateUname(uname){
      let prompt = this.alertCtrl.create({
        title: 'User Name',
        message: "Update the name for user",
        inputs: [
          {
            name: 'username',
            placeholder: 'User Name',
            value:uname
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
              console.log(data.username);
              this.profileProvider.updateUname(data.username);

            }
          }
        ]
      });
      prompt.present();
    }

   
  ionViewDidLoad() {
     console.log(this.userId);
     const userProfile = firebase.database().ref(`/userProfile/${this.userId}`);

     userProfile.on('value', userSnapshot => {
   
      this.user = userSnapshot.val();
     console.log(this.user);
      
    }); 
  

     
}

}
