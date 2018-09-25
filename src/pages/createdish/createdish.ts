import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishProvider } from '../../providers/dish/dish';

import  firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import {PopoverComponent} from '../../components/popover/popover';
import {HomePage} from '../home/home';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the CreatedishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createdish',
  templateUrl: 'createdish.html',
})
export class CreatedishPage {
  // variables to store  loaded ingredients from db
 
  public newDishForm: FormGroup;
  public ingredientList:Array<any>;
  public loadedIngredientList:Array<any>;

  //link variables from global variables in dish.ts file to be displayed in html
  public s_ingredientList = this.dish.s_ingredientList
  public alergenList=this.dish.alergenList;
  public ingredientCalList=this.dish.s_ingredientCalList;
  public totalCalories=this.dish.dishcalories;
  
  public ingredientRef:firebase.database.Reference;


  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder, public dish: DishProvider,public afdb:AngularFireDatabase, public afAuth: AngularFireAuth,public popCtrl:PopoverController, public alertCtrl: AlertController)
  { 
    // link user inputs to variables and validate
    this.newDishForm = formBuilder.group
    ({ 
    dname:  [ '', Validators.compose([Validators.minLength(5), Validators.required])],
    dtype: ['', Validators.required], 
    description:[ '', Validators.compose([Validators.minLength(20), Validators.required])],
    recipe:[ '', Validators.compose([Validators.minLength(30), Validators.required])]
  

    });
// CALLING TEST METHODS

    this.testCreateDish(this.inputsArray);
    this.testAlergens(this.alergensPushed1,this.alergenOtputs1);
    this.testAlergens(this.alergensPushed2,this.alergenOtputs2);
    this.testAlergens(this.alergensPushed3,this.alergenOutputs3);
//loading ingredients from DB

this.ingredientRef = firebase.database().ref('/Ingredients');
this.ingredientRef.on('value', ingredientList => {
   let ingredients = [];
   ingredientList.forEach( ingredient => {
     ingredients.push(ingredient.val());
     return false;
   });
 
    this.loadedIngredientList = ingredients;
  
 });


   }

   goHome()
   {
     this.navCtrl.setRoot(HomePage) ;
    
    }


   presentPopover(myEvent) {
    let popover = this.popCtrl.create(PopoverComponent);
    popover.present({
      ev: PopoverComponent
    });
  }

   initializeItems(): void {
    this.ingredientList = this.loadedIngredientList;
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
  
    this.ingredientList = this.ingredientList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    //console.log(q, this.ingredientList.length);
  
  }
  
  // on click event, ingredient selected, redirects new page
  ingredientSelected(singredient) 
    {
        this.navCtrl.push('IngredientdetailsPage',singredient);
    }
  
  //PROGRAM DELETE INGREDIENT FROM LIST OF SELECTED

  // function to find the position of selected ingredient in array
  getIndex(selectedIngredient)
    { 
      let index = this.dish.s_ingredientList.indexOf(selectedIngredient);
      return index;
    }
  
  //function to decrement total calories

  decrementCalories(index){   

    
    console.log("dishcalories before" +this.dish.dishcalories);
    console.log(this.dish.s_ingredientCalList[index][0]);
    var dishCalories = this.dish.dishcalories;
     for (var i=0; i<dishCalories.length; i++) 
     { 
       
      dishCalories[i]-= this.dish.s_ingredientCalList[index][i].toFixed(2);

     }
    return dishCalories;

     }
  // function to check if any alergen value needs to be deleted from dish info

  checkAlergens(index)
     {
                var alergen=this.dish.alergenOccurence[index];
               
                this.dish.alergenOccurence.splice(index, 1);// delete alergen from arrays with all values 
               
                //check if alergen is still present in array after deletion
                if((alergen!="")&&(this.dish.alergenOccurence.indexOf(alergen)<0))
                {
                // if not present any more  delete alergen from second array with non repetitive values
                let deletedValue=this.dish.alergenList.indexOf(alergen);
                this.dish.alergenList.splice(deletedValue, 1);
                console.log("Non existing alergen just has been deleted" +this.dish.alergenList);
                }
      } 

  
  delete_S_Ingredient(selectedIngredient)
      {

           var index = this.getIndex(selectedIngredient);
           this.decrementCalories(index);
           this.checkAlergens(index);
        
           this.dish.s_ingredientList.splice(index, 1);

       }
  
  createDish()

      { console.log("lenght of the array is "+this.dish.s_ingredientCalList.length); 
      if(this.dish.s_ingredientList.length<2)
       
            { 
              this.presentAlert();

            }
        else
            {
              if(this.dish.alergenList.length< 1)	
                         { this.dish.alergenList.push("no aleregens");}
                         
            
            console.log("dishname is:"+this.newDishForm.value.dname+ "dish type is:"+this.newDishForm.value.dtype+ "dish recipe is:"+this.newDishForm.value.recipe+"dish description:"+this.newDishForm.value.description+"dish calories"+this.dish.dishcalories+"calories per ingredient: "+this.dish.s_ingredientCalList+"alergens in dish : "+this.dish.alergenList+ "occurence of aleregens: "+this.dish.alergenOccurence+"ingredients in this dish: "+this.dish.s_ingredientList);
            this.dish.createDish(this.newDishForm.value.dname,this.newDishForm.value.dtype,this.newDishForm.value.description,this.newDishForm.value.recipe,this.dish.dishcalories,this.dish.s_ingredientCalList, this.dish.alergenList,this.dish.alergenOccurence,this.dish.s_ingredientList);
           
            
            
            }
      }
  

    

      presentAlert() {
        let alert = this.alertCtrl.create({
          title: 'There is less then two ingredients in the dish , please add more ',
      
          buttons: ['Dismiss']
        });
        alert.present();
      }
     //TEST FOR CREATE DISH DEALING WITH EMPTY OR LESS THEN TWO ITEM ARRAYS

     //predefined inputs and expected ouputs for ingredients test
      arrInput1=["asparagus","olive oil"]; 
      expectedOutput1=this.arrInput1; 
      arrInput2=["onion","celery","carrot","garlic",
      "cloves","mince beef","tomatoes","lean","tomato purée",
      "vegetable bouillon","balsamic vinegar","thyme leaves","lasagne sheets"];
      expectedOutput2= this.arrInput2;
      emptyArray: any[]=[];
      oneItemArray= ["almonds"];
      expectedOutput3= "error messadge: less then 2 ingredients"; 
      
      //predefined inputs and expected ouputs for alergens test
      alergensPushed1 =["","","gluten","dairy","gluten",""];
      alergenOtputs1=["gluten","dairy"];
      alergensPushed2 =["","","","",""];
      alergenOtputs2=[];
      alergensPushed3=["","","gluten"];
      alergenOutputs3=["gluten"];
     
     
      

      
    
     inputsArray = [this.arrInput1,this.arrInput2,this.emptyArray,this.oneItemArray];
   
     
     expectedOuputsArray = [this.expectedOutput1,this.expectedOutput2,this.expectedOutput3,this.expectedOutput3];
    
    
   
     //function passing array of predifined input
     testCreateDish(inputsArray)
     { 
        console.log(inputsArray ); 
       //array to push the outputs
       var expectedOuputs: any[]=[];

       //looping through the array and generate outputs 
       console.log(inputsArray.length);
       for (var i=0; i<inputsArray.length; i++)
       {
           // checking the length of each array item
            if((inputsArray[i].length<2)&&(inputsArray[i].key!="emptyAlergens"))
            {  

              expectedOuputs.push("error messadge: less then 2 ingredients");
                          
                
            }
            else
            {
              expectedOuputs.push(inputsArray[i]);
            }
           
        }
       //compare outputs generated by function with predifined expected outputs
       console.log(JSON.stringify(this.expectedOuputsArray));
       console.log(JSON.stringify(expectedOuputs));
       if(JSON.stringify(this.expectedOuputsArray) == JSON.stringify(expectedOuputs))

            {console.log("TEST PASSED");}
          
            else
            
            {console.log("TEST FAILED");}


      }


      testAlergens(alergen, output)
      {
       
      
        
       var alergens =[];
          for(var i=0;i<alergen.length;i++)	
           {  
              
              if((alergens.indexOf(alergen[i])<0)&&(alergen[i]!==""))//Check for for repetitive values and empty strings 
              {
                alergens.push(alergen[i]);//push to array  only non repetitive and non empty alergens 
                
              }
             
                
           }

           if (JSON.stringify(alergens)==JSON.stringify(output))
         
            {
              console.log("TEST PASSED");
            }
            else
            {
              console.log("TEST FAILED");
            }
           
       
        
      }

    
    

  
  
  

   ionViewDidLoad() {
    console.log('ionViewDidLoad CreatedishPage');
  }

}
