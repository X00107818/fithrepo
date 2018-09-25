/***********************
PROGRAM: CREATE_DISH
************************/
INPUT: selectedIngredient{};//details from DB
INPUT: alergenOccurence[] //empty array
INPUT: dishAleregens[] //empty array
INPUT: dishCalories[] //empty array
INPUT: dishCaloriesPerIngredient[] //empty array
INPUT: s_ingredientList[] /empty array

function delete_S_Ingredient(selectedIngredient)
{
	deleteAlergen(selectedingredient);
	decrementTotalCalories(selectedingredient);
	
	selectedIngredients.pop(selectedingredient)
}





FUNCTIONALITY: DELETE-ALERGEN


function getIndex(selectedIngredient)

{  
    
 	return index of selectedIngredient
}


function deleteAlergen()

         
         var index = alergenOccurence[] index of ingredient.alergen// or call return index
		 delete dishAlergenOccurence[index]
		 
		 if (index > -1)
			 LOG "Alergen is still present in dish"
		 else
			 var index2 = alergens[] index of ingredient.alergen
			 delete dishAlergens[index2]
			 
			 
			 



function decrementCalories(index)

         
         dishcalories["index"].eachValue- = ingredientCalVals[index].eachValue
		

			
function delete_S_Ingredient(selectedIngredient){

           index = getIndex(selectedIngredient);
           decrementCalories(index);
           checkAlergens(index);	
           s_ingredientList.splice(index, 1);		



function createDish()
         
           
            
			
		 
           IF(s_ingredientList HAS LENGH LESS THEN 2)
             
              (error) =>  "PLEASE ADD MORE INGREDIENTS"
		   ELSE
				  IF(dishAleregens IS EMPTY)	
				  dishAleregens= ["no aleregens"]
				DB FIREABASE FUNCTION TO STORE DISH
				createDish(users input,
				alergenOccurence[] ,
				dishAleregens[] ,
				dishCalories[], 
	I           dishCaloriesPerIngredient[] 
			   INPUT: s_ingredientList[]
            
      } 
			 

          		 
		 
/*   


/*
PROGRAM: EDIT DISH PROPERTIES
INPUT: dishAlergens[]
INPUT: dishAlergenOccurence[]
INPUT: ingredients[]

function getIndex(selectedIngredient)

{
 	return index
}


function edithDishName(id.dishname)

         editDishname(id, dishname);
		 set dbPath.userId,dishId(dishname:dishname)//firebase syntax
        
*/

          		 
		 
/*   
FUNCTION: DELETEDISH
INPUT: dishid{property: value, ........}
INPUT: ingredientCalVals[]

function deleteDish(dishid)

         deleteDish(dishid);
		 set dbPath.userId(dishid:dishid) delete//firebase syntax
       
*/


/*
PROGRAM: EDIT INGREDIENTS
INPUT: dishAlergens[]
INPUT: dishAlergenOccurence[]
INPUT: ingredientsdb[]
INPUT: ingredients[]

function getIndex(selectedIngredient)

{
 	return index
}


FUNCTION deleteIngredient(ingredients.index)

         delete ingredient.index from ingredientsdb(ingredients[0])
		 deleteIngredient(ingredients[])
		 set dbPath.userId,dishId(ingredients[]:ingredients[]) //firebase syntax
        
*/

          		 
		 
/*   
FUNCTION: addIngredient (selectedIngredient)
         
		 
		incrementCalories(ingredients[])
		checkfor Alergens();
		push selected ingredient to ingredientsdb[]
		push selected ingredient to Calories[]
		set dbPath.userId,dishId(ingredients[]:ingredients[]) //firebase syntax
       
*/


