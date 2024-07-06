import { wishList, getData, addRemoveFav, remFavBtn, addFavBtn, loadingEl } from "./script.js";

// https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}

// Getting the key value pair from the URL > Thus getting the value of mealId
const currentUrl = window.location.href;
let mealId = "";
let paramString = currentUrl.split("?")[1];
let queryString = new URLSearchParams(paramString); // The search params
for (let pair of queryString.entries()) {
    // key = pair[0];
    // value = pair[1];
    mealId = pair[1];
}

// Getting all the DOM fields
const meal_img_src = document.getElementById("meal_img_src"); //For Meal Image
const header = document.getElementById("header"); //For Meal Name
const add_to_fav = document.getElementById("add_to_fav"); //For add/remove Favorite Button

const meal_tags = document.getElementById("meal_tags"); //For Meal tags
const meal_category = document.getElementById("meal_category"); //For Meal category
const meal_area = document.getElementById("meal_area"); //For meal region

const ingredients = document.getElementById("ingredients"); //To display the list of ingredients
const instructions = document.getElementById("instructions"); //To display the instructions

//Function Fetching the and Displaying the data
async function displayMealDetails() {
    // Start Loading
    document.body.appendChild(loadingEl);

    // Fetch Data
    const data = await getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const mealData = data.meals[0];

    console.log(mealData);

    // Setting image
    meal_img_src.src = mealData.strMealThumb;

    // Setting name
    header.textContent = mealData.strMeal;

    // Adding remove fav button functionality
    add_to_fav.innerHTML = wishList.find(id => {
        return id === mealData.idMeal;
    })
        ? remFavBtn
        : addFavBtn;
    add_to_fav.onclick = event => {
        addRemoveFav(add_to_fav, event, mealData);
    };

    //Meal details
    meal_tags.textContent = !mealData.strTags ? "Cuisine" : mealData.strTags;
    meal_category.textContent = mealData.strCategory;
    meal_area.textContent = mealData.strArea;

    //Meal instructions
    instructions.textContent = mealData.strInstructions;

    //Meal Ingredients
    for (let i = 1; i < 21; i++) {
        const ingredient = mealData[`strIngredient${i}`];
        const measure = mealData[`strMeasure${i}`];
        if (ingredient == "" || ingredient == null) continue;
        else {
            const item = document.createElement("tr");
            item.className = "ingredient";
            item.style.color = "#" + Math.floor(Math.random() * 1000000);
            item.innerHTML = `
                                <td class="ingredient_name">${ingredient}</td>
                                <td>:</td>
                                <td class="ingredient_amt">${measure}</td>
                             `;
            ingredients.appendChild(item);
        }
    }

    // Removing Loading Element
    document.body.removeChild(loadingEl);
}

displayMealDetails();
