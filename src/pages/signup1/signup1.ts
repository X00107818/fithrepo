import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import { FieldValue } from '@firebase/firestore-types';
/**
 * Generated class for the Signup1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup1',
  templateUrl: 'signup1.html',
})
export class Signup1Page {
  public loginForm: FormGroup; 
  public loading: Loading;
  public matching_password_group: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public authProvider: AuthProvider,public alertCtrl: AlertController,public formBuilder: FormBuilder, public password: PasswordValidator ) {
    this.loginForm = formBuilder.group({ email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])],
     password: [ '', Validators.compose([Validators.minLength(6), Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]) ] ,
     confirm_password: ['', Validators.compose([Validators.required, this.password.equalto('password')])]
    })
   
   
  

  }


  register(): void { if (!this.loginForm.valid)
    { console.log(this.loginForm.value); }
     else { const email: string = this.loginForm.value.email; 
       const password: string = this.loginForm.value.password; 
            this.authProvider.register(email, password).then( () => { this.loading.dismiss();
              const alert: Alert = this.alertCtrl.create({ message: "You have been successuly registered, please check your email to validate your account", buttons: [ { text: 'OK', role: 'cancel' } ] }); alert.present();  } );
       error => { this.loading.dismiss().then(() => { const alert: Alert = this.alertCtrl.create({ message: error.message, buttons: [ { text: 'OK', role: 'cancel' } ] }); alert.present(); });
      }; 
        this.loading = this.loadingCtrl.create(); this.loading.present(); } }

 goToLogin(): void { this.navCtrl.push('LoginPage'); }
 


  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup1Page');
  }

}
