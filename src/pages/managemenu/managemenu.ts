import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheet, ActionSheetController,Platform, Alert,AlertController} from 'ionic-angular';
import { DishProvider } from '../../providers/dish/dish';
import { Observable } from 'rxjs/Observable';
import { MenuProvider } from '../../providers/menu/menu';

import { AngularFireAuth } from 'angularfire2/auth';
import { stagger } from '@angular/core/src/animation/dsl';


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
  public loadedDishList: Array<any>;
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuProvider: MenuProvider, public dishProvider: DishProvider) {
   
  }

  ionViewDidEnter() { this.menuId = this.navParams.get('menuId'); 
  this.menuProvider.getstarterDishes(this.menuId).valueChanges().subscribe(starters=> { this.starters = starters; }); 
  this.menuProvider.getmainrDishes(this.menuId).valueChanges().subscribe(mains=> { this.mains = mains; });
  this.menuProvider.getdessertDishes(this.menuId).valueChanges().subscribe(desserts=> { this.desserts = desserts; });


}

  initializeItems(): void {
    this.dishList = this.loadedDishList;
  }
  
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.dishList = this.dishList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.dishList.length);
  
  }

  addStarter(name,alergens)
  { console.log(name);
    if(alergens==undefined){alergens="no alergens";}
    this.starters.push({alergens:alergens,dishname:name});
console.log(this.starters)}
  addMain(name,alergens){this.mains.push({alergens:alergens,dishname:name});}
  addDessert(name,alergens){this.desserts.push({alergens:alergens,dishname:name});}


  removeStarter(name,alergens){
    let object=this.starters;
    let index=object.indexOf({alergens:alergens,dishname:name})
 
    function getKeyByValue(object,{alergens:alergens,dishname:name}){
      return Object.keys(object).find(key => object[key] === {alergens:alergens,dishname:name});
     };
     let key=getKeyByValue(object, {alergens:alergens,dishname:name});
   
     console.log(key);
     console.log(index);
     
  
    console.log(this.starters);
  }
  ionViewDidLoad() {
    this.menuProvider.getMenuList().valueChanges().subscribe(menus=> {this.menuList=menus;}); 
    this.dishProvider.getDishList().valueChanges().subscribe(dishes=> { this.dishList = dishes; }); 
  }

}
