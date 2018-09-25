/***********************
PROGRAM: CREATE MENU
************************/


INPUT: selectedDishes = []
INPUT: menuName
INPUT: date
INPUT: type
INPUT: description
INPUT: calories[]
INPUT: alergens[]

starters =[]
dessetes =[]
mains =[]



INPUT: CLICKEVENT for selectDish()
INPUT: CLICKEVENT for createMenu()
       

      
	  
	  FUNCTION selectDish(name, type, description, alergens[], calories[])
	  
	  
          IF dish.type == starter 
              add to array starters[] object {dishName,description, alergens[],calories[]}
		  ELSE IF dish.type == main 
              IF dish.type == starter 
              add to array starters[] object {dishName,description, alergens[],calories[]}
          ELSE			  
		      IF dish.type == starter 
              add to array desserts[] object {dishName,description, alergens[],calories[]}
			  

         
	FUNCTION CreateMenu()

   call parent class function createDish(this valid form fields);	  
	  
	  
	  
/***********************
PROGRAM: EDIT MENU
************************/	    


FUNCTION edit name(menuId, name)
         call parent class function editName(menuId, name);
         

     
FUNCTION addDish()
          call parent class function editName(menuId, name);
		  
		 
FUNCTION deleteDish()



 

      

