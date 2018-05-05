import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading, LoadingController, Alert, AlertController} from 'ionic-angular';
import { Signup1Page } from '../signup1/signup1'; import { AuthProvider } from '../../providers/auth/auth';
import {HomePage} from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  public loginForm: FormGroup; 
  public loading: Loading;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public authProvider: AuthProvider,public alertCtrl: AlertController,public formBuilder: FormBuilder, 
  ) {
    this.loginForm = formBuilder.group({  email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])],
     password: [ '', Validators.compose([Validators.minLength(6), Validators.required]) ] });
  }
  login(): void { if (!this.loginForm.valid)
    { console.log(this.loginForm.value); }
     else { const email: string = this.loginForm.value.email; 
       const password: string = this.loginForm.value.password; 
       this.authProvider.loginUser(email, password).then( () => { this.loading.dismiss().then(() => { this.navCtrl.setRoot(HomePage); }); }, 
       error => { this.loading.dismiss().then(() => { const alert: Alert = this.alertCtrl.create({ message: error.message, buttons: [ { text: 'OK', role: 'cancel' } ] }); alert.present(); }); } );
        this.loading = this.loadingCtrl.create(); this.loading.present(); } }

 goToRegister():void { this.navCtrl.push('Signup1Page'); }
 resetPassword(): void { this.navCtrl.push('ResetpasswordPage'); }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
