import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Alert} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileProvider } from '../../providers/profile/profile';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


/**
 * Generated class for the Signup2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public newProfileForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,formBuilder: FormBuilder, public profileProvider: ProfileProvider,public alertCtrl: AlertController)
  {
    this.newProfileForm = formBuilder.group
    ({ fname:  [ '', Validators.compose([Validators.minLength(2), Validators.required]) ], 
    lname:  [ '', Validators.compose([Validators.minLength(2), Validators.required]) ], 
    uname:  [ '', Validators.compose([Validators.minLength(4), Validators.required]) ] 
    });
  }

  goHome() {this.navCtrl.push(HomePage);}

  createProfile() { if (!this.newProfileForm.valid) 
    { console.log(this.newProfileForm.value); } 
    else 
  { this.profileProvider.createProfile(this.newProfileForm.value.fname,this.newProfileForm.value.lname, this.newProfileForm.value.uname)
    .then( () => { 
      const alert: Alert = this.alertCtrl.create({ message: "Ypur profile was created succesfully", buttons: [ { text: 'OK', role: 'cancel' } ] }); alert.present();  } );
error => { const alert: Alert = this.alertCtrl.create({ message: error.message, buttons: [ { text: 'OK', role: 'cancel' } ] }); alert.present(); };
}; 

 this.goHome(); } 

 
  
   


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
