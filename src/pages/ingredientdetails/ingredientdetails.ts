import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getNavByIdOrName } from 'ionic-angular/components/app/app';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DishProvider } from '../../providers/dish/dish';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase/app';
import { HomePage } from '../home/home';
import { Searchbar } from 'ionic-angular/components/searchbar/searchbar';
import { variable } from '@angular/compiler/src/output/output_ast';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the IngredientdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingredientdetails',
  templateUrl: 'ingredientdetails.html',
})
export class IngredientdetailsPage {
 
 testServing = 200;
 testServing2=2;
 testServing3=80;
 testServing4=20;
 unit = "grams";
 unit2 = "piece";
 unit3 = "slice";


arrToIncrement = [0,0,0,0,0,0,0];

passedCalories1 = [10, 25, 5, 12.5, 9, 0, 0];
passedCalories2 = [10, 25, 5, 12.5, 9, 0, 0];
passedCalories3 = [20, 2.2, 3.88, 0.12, 0.048, 1.88, 0];
passedCalories4 =[132, 3.82, 25.3, 1.64, 0.358, 2.16, 0.34];
passedCalories5 =[541, 37.04, 1.43, 41.78, 13.739, 0, 2.31]

expectedCalories1 = [20, 50, 10, 25, 18, 0, 0 ];
expectedCalories2 = [16, 1.76, 3.104, 0.096, 0.0384,1.504, 0];//80 gramms
expectedCalories3 = [264, 7.64, 50.6, 3.28, 0.716, 4.32, 0.68];//2slices
expectedCalories4 = [108.2, 7.408, 0.286, 8.356, 2.7478, 0, 0.462];//20g

expectedTotal1 = [20, 50, 10, 25, 18, 0, 0];
expectedTotal2 = [40, 100, 20, 50, 36, 0, 0];
expectedTotal3 = [56, 101.76, 23.104, 50.096,36.0384, 1.504, 0];
expectedTotal4 = [320, 109.4, 73.704, 53.376, 36.7544, 5.824, 0.68];
expectedTotal5 = [428.2, 116.808, 73.99, 61.732, 39.5022, 5.824, 1.142];







  public calculate : FormGroup;
  ingredientInfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder ,public dish: DishProvider, public afAuth: AngularFireAuth,public alertCtrl: AlertController) {
    this.ingredientInfo=this.navParams.data;
    this.calculate = formBuilder.group({
    servingsize: ['',Validators.compose([Validators.min(0), Validators.max(200), Validators.required]) ]
    
   });
   //TEST CASE ONE
   if (JSON.stringify(this.expectedCalories1) ==this.convertCalories(this.testServing,this.passedCalories1,this.unit))
   {
     console.log("test passed ");

   }
   else
   {
     console.log("test failed");
   }
  //TEST CASE ONE INCREMENT
  
   if (JSON.stringify(this.testIncrement(this.expectedCalories1)) ==JSON.stringify(this.expectedTotal1))
      {
       console.log(" Incrementing total test passed ");
      }
   else
      {
       console.log("this is expected after increment"+ this.expectedTotal1 + "end this was returned by function "+this.testIncrement(this.expectedCalories1));
       console.log(" Incrementing total test failed ");
      }
   
  //TEST CASE TWO
   if (JSON.stringify(this.expectedCalories1) ==this.convertCalories(this.testServing2,this.passedCalories2,this.unit2))
    {
      console.log("test passed");
     }
   else
    {
      console.log("test failed");
    }
   //TEST CASE TWO INCREMENT
  
   if (JSON.stringify(this.testIncrement(this.expectedCalories1)) ==JSON.stringify(this.expectedTotal2))
      {
       console.log(" Incrementing total test passed ");
      }
   else
      {
       console.log(" Incrementing total test failed ");
      }

    //TEST CASE THREE
    if (JSON.stringify(this.expectedCalories2) ==this.convertCalories(this.testServing3,this.passedCalories3,this.unit))
    {
      console.log("test 3 passed");
     }
   else
    { 
      console.log("test 3 failed");
    }
   //TEST CASE THREE INCREMENT
  
   if (JSON.stringify(this.testIncrement(this.expectedCalories2)) ==JSON.stringify(this.expectedTotal3))
      {
       console.log(" Incrementing total test 3 passed ");
      }
   else
      {
      
       console.log(" Incrementing total test 3 failed ");
      }  
      
      
    //TEST CASE FOUR

   if (JSON.stringify(this.expectedCalories3) == this.convertCalories(this.testServing2,this.passedCalories4,this.unit3))
   {
     console.log("test 4 passed");
    }
  else
   { 
     console.log("test 4 failed");
   }
  //TEST CASE FOUR INCREMENT
 
  if (JSON.stringify(this.testIncrement(this.expectedCalories3)) ==JSON.stringify(this.expectedTotal4))
     {
      console.log(" Incrementing total test 4 passed ");
     }
  else
     {
      console.log("this is increment predefined output "+this.expectedTotal4+ "\n this was generated by increment function "+ this.testIncrement(this.expectedCalories3));
      console.log(" Incrementing total test 4 failed ");
     }  



   //TEST CASE FIVE

    if (JSON.stringify(this.expectedCalories4) ==this.convertCalories(this.testServing4,this.passedCalories5,this.unit))
    {
      console.log("test 5  passed");
     }
   else
    {  
      console.log("test 5 failed");
    }
  //TEST CASE FIVE INCREMENT
  
   if (JSON.stringify(this.testIncrement(this.expectedCalories4)) ==JSON.stringify(this.expectedTotal5))
      {
       console.log(" Incrementing total test 5 passed ");
      }
   else
      {
       
       console.log(" Incrementing total test 5 failed ");
      }  

   }

backToDish()
  {
    this.navCtrl.push('CreatedishPage');
  }


countGrammsOrMl(servings)

  {
    //all calories values in database are  per 100 units(gramms or ml) , therefore user input is devided by 100 before multiplication
  
    var ingredientCal=(servings/100) * this.ingredientInfo.calories ;
    var ingredientProteins= (servings/100) * this.ingredientInfo.proteins;
    var ingredientCarbs=(servings/100) * this.ingredientInfo.carbohydrates;
    var ingredientFat=(servings/100) * this.ingredientInfo.fat;
    var igredientSaturatedF=(servings/100) * this.ingredientInfo.saturatedF;
    var ingredientSugar=(servings/100) * this.ingredientInfo.sugar;
    var ingredientSalt= (servings/100) * this.ingredientInfo.salt;
     return [ingredientCal,ingredientProteins,ingredientCarbs, ingredientFat, igredientSaturatedF,ingredientSugar,ingredientSalt]

   }


 countOtherUnits(servings)

  {
     //just multiply calories  by  user input, calories in dbatabase are stored per 1 unit

    var ingredientCal=servings* this.ingredientInfo.calories ;
    var ingredientProteins= servings* this.ingredientInfo.proteins;
    var ingredientCarbs= servings *this.ingredientInfo.carbohydrates;
    var ingredientFat= servings * this.ingredientInfo.fat;
    var igredientSaturatedF=servings *this.ingredientInfo.saturatedF;
    var ingredientSugar= servings *this.ingredientInfo.sugar;
    var ingredientSalt=  servings *this.ingredientInfo.salt;
    return [ingredientCal,ingredientProteins,ingredientCarbs, ingredientFat, igredientSaturatedF,ingredientSugar,ingredientSalt]
  }    

 checkAlergen(alergen)

  {
    console.log("Passed in alergen: "+alergen+ "checking if value of check for empty string: "+!alergen || 0 === alergen.length);
    //push each alergen value to array , this array also includes empty strings and repetitive values
    //this array is reused during deletion of ingredient

   /* if (!alergen || 0 === alergen.length)
      {
        this.dish.alergenOccurence.push("");
      }
      else
      {
       
      }*/
     this.dish.alergenOccurence.push(alergen);
    
    if((this.dish.alergenList.indexOf(alergen)<0)&&(alergen!==""))//Check for for repetitive values and empty strings 
      {
        this.dish.alergenList.push(alergen);//push to array  only non repetitive and non empty alergens 
        console.log("alergen has been pushed to  list: ");
        console.log(this.dish.alergenList);
      }
      else if(this.dish.alergenList.indexOf(alergen) >-1)
      {
        console.log("alergen is already in list with index: ");// else log the messagge 
        console.log(this.dish.alergenList.indexOf(alergen)); 
        console.log("list of currrent alergens: "+this.dish.alergenList);

      }

  }

 incrementTotal(calories)
  {
    var totalCalories = this.dish.dishcalories;
    console.log("total calories: "+totalCalories[0] +" ingredient calories: "+calories[0]);
    for (var i= 0; i<totalCalories.length; i++)
    {  
      totalCalories[i]+= calories[i];
      
      
    }
  
  }
 
submitIngredient() {
  

/*declaration of ingredient unit type pulled from the database . I will eiher return slice, piece or gram */
const unit=this.ingredientInfo.measureUnit;
console.log( "Unit is : "+unit);
console.log( "Alergen is: "+this.ingredientInfo.alergens);


/*user input of serving size ie how much of grams/slices/pieces */
var servings= this.calculate.value.servingsize; 

if((unit=="grams" )||(unit=="ml")) //  if units are gramms or ml
  {
    var calories = this.countGrammsOrMl(servings);

  }

else // else if it can be slice ,piece , pich, table spoon , tea spoon 
  {
    var calories= this.countOtherUnits(servings);

  }
 console.log("calories in ingredient: "+JSON.stringify(calories));
 this.dish.s_ingredientCalList.push(calories);

 this.dish.s_ingredientList.push(this.ingredientInfo.name)

 this.checkAlergen(this.ingredientInfo.alergens);
 this.incrementTotal(calories);

  
 //outputs in console  

console.log(this.dish.alergenOccurence);
console.log(this.dish.s_ingredientList);
console.log(this.dish.s_ingredientCalList);
console.log("total calories" +this.dish.dishcalories);

if(servings.length==0)
{servings=0;}
this.presentAlert(servings,unit);
this.backToDish();


}

presentAlert(serving,unit) {
  let alert = this.alertCtrl.create({
    title: 'You just added '+serving +" "+unit+" of "+this.ingredientInfo.name+' to your dish',

    buttons: ['Dismiss']
  });
  alert.present();
}




//TEST FUNCTION 
  

convertCalories(servings,arr,unit)//passing in servings , units and array
   
   {
    console.log("Array I passed in: "+arr+"servings: "+servings );
    /*  
    example of same as following with object values:
	  var keys = Object.keys(object);
	  keys.forEach(function(key) {
      object[key] *= servings/100;
	
    });*/


    if((unit=="grams" )||(unit=="ml")) //  if units are gramms or ml
    {
      for (var i=0; i<arr.length; i++)
      {
        arr[i] *= 100 * servings;
        arr[i] /= 10000;
        
        //arr[i] *= servings/100;//increment each value  of passed calories by servings multiplication and devide by 100
      }
     
     
      //after incremantation passed calorries should equal passed calories

    
        return JSON.stringify(arr)
    }

    else
    {  
      
      for (var i=0; i<arr.length; i++)
       {
          arr[i] *= 100 * servings//increment each value by servings multiplication
          arr[i] /=100;
       }
   
     return JSON.stringify(arr)

    }

  
   }

   testIncrement(expectedCal)
    {  console.log ("arr before incementing " +this.arrToIncrement);
      console.log ("this is passed array "+expectedCal);
      console.log ("this is expected predefined total "+this.expectedTotal4);
      for (var i=0; i<expectedCal.length; i++)
        { 
          this.arrToIncrement[i] +=  expectedCal[i];
        }
      console.log ("this is generated by function " +this.arrToIncrement) 
      return this.arrToIncrement
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngredientdetailsPage');
  }

}
