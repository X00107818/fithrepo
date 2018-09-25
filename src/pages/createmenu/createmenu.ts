import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheet, ActionSheetController,Platform, Alert,AlertController} from 'ionic-angular';
import { DishProvider } from '../../providers/dish/dish';
import { Observable } from 'rxjs/Observable';
import { MenuProvider } from '../../providers/menu/menu';

import { AngularFireAuth } from 'angularfire2/auth';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import {PopoverComponent} from '../../components/popover/popover';
import { HomePage } from '../home/home';
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
   //declaring form
  public newMenuForm: FormGroup; 

  //retrieved dishes from DB
  public dishList: Array<any>;

 
  //retrieved data from DB  
  public starters=this.menuProvider.starters;
  public mains=this.menuProvider.mains;
  public desserts=this.menuProvider.desserts;


  constructor( public navCtrl: NavController,public formBuilder:FormBuilder, public afAuth:AngularFireAuth,public navParams: NavParams,public platform: Platform, public dishProvider: DishProvider,public actionCtrl: ActionSheetController, public alertCtrl: AlertController,public menuProvider: MenuProvider,public popCtrl: PopoverController) {
    
         this.newMenuForm = formBuilder.group//validation
         ({ name: [ '', Validators.compose([Validators.minLength(4), Validators.required])], date: ['', Validators.required] });
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

    // push  four values for each dish which has been added to a menu
     addStarter(dishname, description, alergens, calories)
      {
          this.menuProvider.starters.push({dishname,description,alergens, calories}); 
          console.log(this.menuProvider.starters);
      }

      addMain(dishname, description, alergens, calories )
       {
          this.menuProvider.mains.push({dishname,description,alergens, calories});
          console.log(this.menuProvider.mains);
       }
      
      addDessert(dishname, description, alergens, calories)
       {
          this.menuProvider.desserts.push({dishname,description,alergens, calories});
          console.log(this.menuProvider.desserts);
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
       
       removeDessert(dishname)
       {
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
      var data = this.desserts;
      
      var index=findIndexInData(data, 'dishname', dishname);
    
      this.desserts.splice(index,1);
    
       }
      

        createMenu()
         {
           console.log("button clicked");
           if (!this.newMenuForm.valid) 
              { console.log(this.newMenuForm.value); }
           else 
               { this.menuProvider.createMenu( this.newMenuForm.value.name, this.newMenuForm.value.date ) .then
                 ( () => { this.presentAlert(); }, error => { console.log(error); } );
                this.navCtrl.push(HomePage) } 
        }

       presentAlert()
       { let alert = this.alertCtrl.create({
          title: 'Menu has been successfully created ',
      
          buttons: ['Dismiss']
        });
        alert.present();}


  ionViewDidLoad() {
    
    this.dishProvider.getDishList().valueChanges().subscribe(dishes=> { this.dishList = dishes; }); 
 
  }

}
