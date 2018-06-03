import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheet, ActionSheetController,Platform, Alert,AlertController} from 'ionic-angular';
import { DishProvider } from '../../providers/dish/dish';
import { Observable } from 'rxjs/Observable';
import { MenuProvider } from '../../providers/menu/menu';
import firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
/**

/**
 * Generated class for the CreatemenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createmenu',
  templateUrl: 'createmenu.html',
})
export class CreatemenuPage {

  public newMenuForm: FormGroup; 
 
  public menuList: Array<any>;
  public dishRef:firebase.database.Reference;
  public loadedDishList:Array<any>;
  public dishList: Array<any>;
  public dishNames:Observable<any>;
  public userId;

  public starters=this.menuProvider.starters;
  public mains=this.menuProvider.mains;
  public desserts=this.menuProvider.desserts;


  constructor( public navCtrl: NavController,public formBuilder:FormBuilder, public afAuth:AngularFireAuth,public navParams: NavParams,public platform: Platform, public dishProvider: DishProvider,public actionCtrl: ActionSheetController, public alertCtrl: AlertController,public menuProvider: MenuProvider) {
    this.afAuth.authState.subscribe(user => 
      { this.userId = user.uid; 
         });
         this.newMenuForm = formBuilder.group({ name: ['', Validators.required], date: ['', Validators.required] });
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
     moreDishOptions(dishname, alergens ,type){
     if (alergens==undefined){alergens="no alergens";}
     if(type=='starter'){this.menuProvider.starters.push({dishname,alergens});}
       else if(type=='main'){this.menuProvider.mains.push({dishname,alergens});}
       else{this.menuProvider.desserts.push({dishname,alergens});}
       console.log(this.menuProvider.starters);
       console.log(this.menuProvider.mains);
       console.log(this.menuProvider.desserts);
     }

    createMenu() { console.log("button clicked");
        if (!this.newMenuForm.valid) { console.log(this.newMenuForm.value); }
      else { this.menuProvider.createMenu( this.newMenuForm.value.name, this.newMenuForm.value.date ) .then
        ( () => { this.navCtrl.pop(); }, error => { console.log(error); } ); } }


  ionViewDidLoad() {
    this.menuProvider.getMenuList().valueChanges().subscribe(menus=> {this.menuList=menus;}); 
    this.dishProvider.getDishList().valueChanges().subscribe(dishes=> { this.dishList = dishes; }); 
 
  }

}
