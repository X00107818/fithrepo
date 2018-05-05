import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  constructor(public viewCtrl: ViewController,public navCtrl: NavController) {
    console.log('Hello PopoverComponent Component');
   
  }

  close() {
   this.viewCtrl.dismiss();
  }
  goToProfile(){
    this.navCtrl.push('EditprofilePage');
  }

  goToCreateProfile(){
    this.navCtrl.push('ProfilePage');
  }

}
