import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheet, ActionSheetController,Platform, Alert,AlertController} from 'ionic-angular';
import { DishProvider } from '../../providers/dish/dish';
import { Observable } from 'rxjs/Observable';
import { MenuProvider } from '../../providers/menu/menu';
import firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
/**
 * Generated class for the MenusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menus',
  templateUrl: 'menus.html',
})
export class MenusPage {
  public newMenuForm: FormGroup; 
 
  public menuList: Array<any>;



  constructor( public navCtrl: NavController,public formBuilder:FormBuilder, public afAuth:AngularFireAuth,public modal:ModalController, public navParams: NavParams,public platform: Platform, public dishProvider: DishProvider,public actionCtrl: ActionSheetController, public alertCtrl: AlertController,public menuProvider: MenuProvider) {
   
      }

 
   
      moreMenuOptions(menuId:string, date:string, name:string ):void { let action:ActionSheet = this.actionCtrl.create({ title: 'Modify your menu',
      buttons: [ 
      {
       text: 'Delete', role: 'destructive', icon: !this.platform.is('ios') ?
        'trash' : null, handler: () => { this.menuProvider.removeMenu(menuId); } },
   
       {
         text: 'Update list of dishes in the menu', icon: !this.platform.is('ios') ? 
         'play' : null, handler: () => { this.navCtrl.push('ManagemenuPage', { menuId: menuId }); } },
   
       {
         text: 'Update date field', icon: !this.platform.is('ios') ?
            'checkmark' : null, handler: () => { this.updateDate(menuId,date); } }, 
   
       {
          text: 'Update menu Name field', icon: !this.platform.is('ios') ?
              'checkmark' : null, handler: () => { this.updatemenuName(menuId,name); } },    
         
      ] 
   }); action.present(); }


   updateDate(menuId, date){
    let prompt = this.alertCtrl.create({
      title: 'Menu Date',
      message: "Update the date of release",
      inputs: [
        {
          name: 'menudate',
          placeholder: 'New date',
          value: date
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data.date);
            this.menuProvider.updateDate(menuId, data.menudate);
  
          }
        }
      ]
    });
    prompt.present();
  }
  
 
  updatemenuName(menuId, name){
    let prompt = this.alertCtrl.create({
      title: 'Menu Name',
      message: "Update the name for menu",
      inputs: [
        {
          name: 'menuname',
          placeholder: 'Menu Name',
          value: name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data.menuname);
            this.menuProvider.updatemenuName(menuId,data.menuname);
  
          }
        }
      ]
    });
    prompt.present();
  }
  
 
  ionViewDidLoad() {this.menuProvider.getMenuList().valueChanges().subscribe(menus=> {this.menuList=menus;}); 
    
 
  }

}
