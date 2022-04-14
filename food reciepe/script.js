const input=document.querySelector("#inp1");
const btn1=document.querySelector("#b1");
btn1.addEventListener('click',getmeals);

const items=document.querySelector("#items"); 

const mealreciepebtn=document.querySelector("#getreciepe");
items.addEventListener('click',recipe);

const mealRecipediv=document.querySelector("#mealsreciepe");
mealRecipediv.addEventListener('click',(e)=>{
  
  if(e.target.parentElement.classList.contains('closebutton')){
    console.log(e.target.parentElement);
    mealRecipediv.style.display='none';
  }
})
function recipe(e){
 //console.log(e.target.parentElement.parentElement); 
 mealItem=e.target.parentElement.parentElement;
 mealItemid=mealItem.dataset.id;
 //console.log(mealItemid);
 
 fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItemid}`)
 .then(response=>response.json())
 .then(data=>{
   console.log(data)
  mealRecipediv.innerHTML="";
   mealRecipediv.innerHTML+=
   `<div class="mealsDetails">
   <button type="button" class="closebutton" id="cancel"><i class="fas fa-times-circle"></i></button>
   <div id="mealdish-container">
   <h2><u>${data.meals[0].strMeal}</u></h2>
   <p>${data.meals[0].strInstructions}</p>
   <div id="mealdishContainer-pic">
   <img src=${data.meals[0].strMealThumb}  alt="meal-pic">
   <a  href=${data.meals[0].strYoutube}>Youtube link</a>
   </div>
   </div>
   </div>`
   mealRecipediv.style.display='';
    console.log(mealRecipediv);    
}
  );


  
}
 function getmeals(){
  const food=input.value;
  console.log(food);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${food}`)
    .then(response=>response.json())
    .then(data=>{
      if(data.meals){
      
      let html="";
        data.meals.forEach(meal => {
         // console.log(meal);
           html+= `<div id="card" data-id="${meal.idMeal}">
            <h1 id="name">${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="" id="pic">
            <div>
            <button type="button" class="getreciepe">Get reciepe</button>
            </div>
        </div>`
        })
        items.innerHTML= html;
        //console.log(data);
      }
      else{
        items.innerHTML=`<div id="dishnotfound">
        <h2 >Dish not found, try different!</h2>
        </div>`;
      }
    })
  // console.log(data.strMeal[0]); 
}

   