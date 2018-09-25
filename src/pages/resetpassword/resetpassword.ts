import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Alert, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; import { AuthProvider } from '../../providers/auth/auth'; 
/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  public resetPasswordForm: FormGroup; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public authProvider: AuthProvider, formBuilder: FormBuilder )
   {
    this.resetPasswordForm = formBuilder.group({ email: ['', Validators.required] });

   }

   resetPassword(): void { if (!this.resetPasswordForm.valid) 
    { console.log(this.resetPasswordForm.value); } 
    else { const email: string = this.resetPasswordForm.value.email; this.authProvider.resetPassword(email).then
      ( user => { const alert: Alert = this.alertCtrl.create({ message: 'We sent you a reset link. Please check your email', buttons: [ { text: 'Ok', role: 'cancel', handler: () => { this.navCtrl.pop(); } } ] });
       alert.present(); }, error => { var errorMessage: string = error.message;
       const errorAlert: Alert = this.alertCtrl.create({ message: errorMessage, buttons: [ { text: 'Ok', role: 'cancel' } ] });
       errorAlert.present(); } ); } }

   //redirects to login page      
 goToLogin(): void 
 {
    this.navCtrl.push('LoginPage');
 }
     

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

}
