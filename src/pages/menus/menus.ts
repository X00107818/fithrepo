import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuProvider } from '../../providers/menu/menu';
import { Observable } from 'rxjs/Observable';
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
  public menuList: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuProvider: MenuProvider) {
  }
 
  ionViewDidLoad() {
    this.menuList = this.menuProvider.getMenuList().valueChanges();
  }

}
