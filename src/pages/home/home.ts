
  

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import {PopoverComponent} from '../../components/popover/popover'

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public popCtlr: PopoverController) {

  }
  
  

presentPopover(myEvent) {
  let popover = this.popCtlr.create(PopoverComponent);
  popover.present({
    ev: PopoverComponent
  });}


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goToMenus (){
    this.navCtrl.push('MenusPage');
  }
  goToDishes (){
    this.navCtrl.push('DishesPage');
  }

  
  goToCreateDish (){
    this.navCtrl.push('CreatedishPage');
  }

  goToCreateMenu (){
    this.navCtrl.push('CreatemenuPage');
  }
 
  goHome(){this.ionViewDidLoad();}
 
  
}
