import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileProvider } from '../../providers/profile/profile';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,formBuilder: FormBuilder, public profileProvider: ProfileProvider )
  {
    this.newProfileForm = formBuilder.group
    ({ fname: ['', Validators.required], 
    lname: ['', Validators.required], 
    uname: ['', Validators.required] 
    });
  }

  createProfile() { if (!this.newProfileForm.valid) 
    { console.log(this.newProfileForm.value); } 
    else 
  { this.profileProvider.createProfile(this.newProfileForm.value.fname,this.newProfileForm.value.lname, this.newProfileForm.value.uname, false)
   .then( () => { this.navCtrl.push(HomePage); }, error => { console.log(error); } ); } }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
