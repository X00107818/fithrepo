import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { HttpModule } from '@angular/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AuthProvider } from '../providers/auth/auth';
import { DishProvider } from '../providers/dish/dish';
import { ProfileProvider} from '../providers/profile/profile';
import { MenuProvider} from '../providers/menu/menu';


import { HomePage } from '../pages/home/home';
import { PasswordValidator } from '../validators/password.validator';
import { PopoverComponent } from '../components/popover/popover';
import {TabsPage} from  '../pages/tabs/tabs';




export const firebaseConfig = {
  apiKey: "AIzaSyDJh4eA_Mue2JZC0QRBRym6IdH1YRLcSOk",
    authDomain: "menu-app-533df.firebaseapp.com",
    databaseURL: "https://menu-app-533df.firebaseio.com",
    projectId: "menu-app-533df",
    storageBucket: "menu-app-533df.appspot.com",
    messagingSenderId: "241947333534"

};



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    PopoverComponent,
    
  

  
   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    PopoverComponent,
    
  
    
     
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
   { provide: ErrorHandler, useClass: IonicErrorHandler },
   /*{provide: Camera, useClass: CameraMock},*/
    AuthProvider,
    DishProvider,
    ProfileProvider,
    MenuProvider,
    ProfileProvider,
    PasswordValidator
  
    
    
  ]
})
export class AppModule { }
