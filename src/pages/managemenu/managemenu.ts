import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheet, ActionSheetController,Platform, Alert,AlertController} from 'ionic-angular';
import { DishProvider } from '../../providers/dish/dish';
import { Observable } from 'rxjs/Observable';
import { MenuProvider } from '../../providers/menu/menu';

import { AngularFireAuth } from 'angularfire2/auth';
import { stagger } from '@angular/core/src/animation/dsl';

  import {PopoverComponent} from '../../components/popover/popover';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { HomePage } from '../home/home';

/**
 * Generated class for the ManagemenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'menu/:menuId' 
})
@Component({
  selector: 'page-managemenu',
  templateUrl: 'managemenu.html',
})
export class ManagemenuPage {
  public menuId: string;
  public starters;
  public mains;
  public desserts;

  public menuList: Array<any>;
  public dishList: Array<any>;
  
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuProvider: MenuProvider, public dishProvider: DishProvider, public popCtrl: PopoverController) {
   
  }

  presentPopover(myEvent) {
    let popover = this.popCtrl.create(PopoverComponent);
    popover.present({
      ev: PopoverComponent
    });
  }

  goHome()
  {
    this.navCtrl.push(HomePage) ;
   
   }

  ionViewDidEnter() { this.menuId = this.navParams.get('menuId'); 
  this.menuProvider.getstarterDishes(this.menuId).valueChanges().subscribe(starters=> { this.starters = starters; }); 
  this.menuProvider.getmainDishes(this.menuId).valueChanges().subscribe(mains=> { this.mains = mains; });
  this.menuProvider.getdessertDishes(this.menuId).valueChanges().subscribe(desserts=> { this.desserts = desserts; });


}

  

  addStarter(dishname,description,alergens, calories)
  { console.log(name);
    
    this.starters.push({dishname,description,alergens, calories});
    console.log(this.starters);

  }
  addMain(dishname,description,alergens, calories)
  
  {
    this.mains.push({dishname,description,alergens, calories});
    console.log(this.mains);
  }

  addDessert(dishname,description,alergens, calories)
  {
    this.desserts.push({dishname,description,alergens, calories});
    console.log(this.desserts);
    
  }
  

  removeStarter(dishname){
   
 
    function findIndexInData(data, property, value) {
      var result = -1;
      data.some(function (item, i) {
          if (item[property] === value) {
              result = i;
              return true;
          }
      });
      return result;
  }
  var data = this.starters
  
  var index=findIndexInData(data, 'dishname', dishname);

  this.starters.splice(index,1);


  }


  removeMain(dishname){
   
 
    function findIndexInData(data, property, value) {
      var result = -1;
      data.some(function (item, i) {
          if (item[property] === value) {
              result = i;
              return true;
          }
      });
      return result;
  }
  var data = this.mains
  
  var index=findIndexInData(data, 'dishname', dishname);

  this.mains.splice(index,1);


  }

  removeDessert(dishname){
   
 
    function findIndexInData(data, property, value) {
      var result = -1;
      data.some(function (item, i) {
          if (item[property] === value) {
              result = i;
              return true;
          }
      });
      return result;
  }
  var data = this.desserts
  
  var index=findIndexInData(data, 'dishname', dishname);

  this.desserts.splice(index,1);


  }

  updateMenu()
  {
    this.menuProvider.updateMenu(this.menuId,this.starters, this.mains,this.desserts);
    
  }


  ionViewDidLoad() {
    this.menuProvider.getMenuList().valueChanges().subscribe(menus=> {this.menuList=menus;}); 
    this.dishProvider.getDishList().valueChanges().subscribe(dishes=> { this.dishList = dishes; }); 
  }

}
