/***********************
PROGRAM: ADD__INGREDIENT
************************/

INPUT: unit, amountOfUnits, calories, proteins, carbohydrates, fat, saturatedfat, sugar, salt, alergens, FROM selectedIngredient{}
INPUT: calories, proteins, carbohydrates, fat, saturatedfat, sugar, salt, alergens, FROM dishCalories[]

INPUT: amount
INPUT: alergenOccurence[] //empty array
INPUT: alergenList[] //empty array
INPUT: s_ingredientCalList[]
INPUT: s_ingredientList[]


FUNCTION submitIngredient()

       IF ingredient.unit == gramm
	     
		 var calories = countGrams()
	   
	  
	   ELSE 
		   
	  // ingredient.amountOfUnits = 1 piece, slice, table spoon, tea spoon , pinch
	  
	     var calories = countOtherUnits()
		 
	   
PUSH calories to dishCaloriesPerIngredient   
check alergen();
incrementTotal(calories{});
push ingredient.name to ingredients[];
		 
		 
FUNCTION  check alergen()

	   
	   alergenOccurence[].push(ingredient.alergen)
	   IF dishAlergens[].indexOf(ingredient.alergen)>-1
	   OUTPUT: CONSOLE LOG "ALERGEN ALREADY IN ARRAY"
	  
	   ELSE 
	   OUTPUT: CONSOLE LOG"Adding alergen to OCCURANCE ARRAY"	   
	   dishAlergens[].push(alergen)


FUNCTION countGramms()

       ingredient.amountOfUnits = 100 
	   
	   
	   Object.keys(calories).forEach(function(key,index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object 
	selectedIngredient[key]*= amount/100;
	
});

      /****************************
 TEST FOR CALCULATE CALORIES
*****************************/

var expectedCalories = {20, 50, 10, 25, 18}

   IF( var expectedCalories == convertCalories({10, 25, 5, 12.5, 9}))
 servings = 200;	
FUNCTION convertCalories
   
     (servings/100) * calories

	  
	   
	   calories = amount/100 * selectedIngredient.calories
	   carbohydrates = amount/100 * ingredient.carbohydrates
	   fat = amount/100 * fat
	   saturatedfat = amount/100 * ingredient.saturatedfat
	   sugar = amount/100 * ingredient.sugar
	   salt = amount/100 * ingredient.salt
	   calories = amount/100 * ingredient.calories
	   
	   var calories ={calories,carbohydrates,proteins,fat,saturatedfat,sugar,salt}	
     
	   OUTPUT:calories	

FUNCTION countOtherUnits()	

        calories = amount * ingredient.calories
	   carbohydrates = amount * ingredient.carbohydrates
	   proteins = amount * ingredient.proteins
	   fat = amount * fat
	   saturatedfat = amount * ingredient.saturatedfat
	   sugar = amount * ingredient.sugar
	   salt = amount * ingredient.salt
	   calories = amount * ingredient.calories
	   
	   var calories ={calories,carbohydrates,proteins,fat,saturatedfat,sugar,salt}	
	   OUTPUT calories   

FUNCTION incrementTotal(calories{})

	
	totalcalories[0]+ = calories["0"].calories
	totalcalories[1]+ = calories[1]
	totalcalories[2]+ = calories[2]
	totalcalories[3]+ = calories[3]
	totalcalories[4]+ = calories[4]
	totalcalories[5]+ = calories[5]
	totalcalories[6]+ = calories[6]
	
	
FUNCTION createDish()
          IF (alergens.length == 0)
			  alergens.push("no alergens present");
		  call parent class function createDish(this valid form fields);
   
		
		   
	   
		   
	   
	   


