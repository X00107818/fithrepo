import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, ActionSheetController,Platform} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
/**
 * Generated class for the ManagedishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-managedish',
  templateUrl: 'managedish.html',
})
export class ManagedishPage {
 
  public dishList: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform) {
    
     
  }

 


  ionViewDidLoad() {
     


}}
