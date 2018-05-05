
  

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {storage, initializeApp} from 'firebase';
import { Config } from 'ionic-angular/config/config';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public camera: Camera, public popCtlr: PopoverController) {

  }
  
  async takePhoto(){
    try{
    const options: CameraOptions ={
      quality:50,
      targetHeight:600,
      targetWidth:600,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
      
    }
    const image='data:image/jpeg;base64,${result}';
    const pictures= storage().ref('pictures');
    pictures.putString(image, 'data_ul');
    const result = await this.camera.getPicture(options);
  }
catch(e){
  console.error(e);
}}

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
    this.navCtrl.push('CreatedishPage');
  }

  logMeout(){
  this.authProvider.logoutUser();
  this.navCtrl.push('LoginPage');
  }

  
}
