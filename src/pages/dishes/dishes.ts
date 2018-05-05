import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheet, ActionSheetController,Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../../providers/dish/dish';

/**
 * Generated class for the DishesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishes',
  templateUrl: 'dishes.html',
})
export class DishesPage {

public dishList: Observable<any>;

  constructor( public navCtrl: NavController, public navParams: NavParams,public platform: Platform, public dishProvider: DishProvider,public actionCtrl: ActionSheetController) 
  {}

 

  ionViewDidLoad() {
    this.dishList = this.dishProvider.getDishList().valueChanges();

  }

}
