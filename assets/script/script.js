// Getting data using api
export async function getData(api) {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error("Data Not Found!");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export function createMeal(mealData) {
    // console.log(mealData);
    const meal = document.createElement("div");
    meal.className = "meal";

    meal.innerHTML = `
                    <div class="meal_img">
                        <img
                            src="${mealData.strMealThumb}"
                            alt=""
                        />
                    </div>
                    `;
    const mealDetails = document.createElement("div");
    mealDetails.className = "meal_details";
    mealDetails.innerHTML = `
                        <div class="meal_dets">
                            <div class="meal_name">${mealData.strMeal}</div>
                            <div class="meal_tags">${
                                !mealData.strTags ? "Cuisine" : mealData.strTags
                            }</div>
                            <div class="meal_category">${mealData.strCategory}</div>
                            <div class="meal_area">
                                <i class="fa fa-map-marker" aria-hidden="true"></i> ${
                                    mealData.strArea
                                }
                            </div>
                        </div>`;
    const favBtn = document.createElement("button");
    favBtn.className = "add_to_fav";
    favBtn.id = "add_to_fav";
    favBtn.innerHTML = wishList.find(id => id === mealData.idMeal) ? remFavBtn : addFavBtn;
    favBtn.onclick = event => {
        addRemoveFav(favBtn, event, mealData);
    };
    mealDetails.appendChild(favBtn);
    meal.appendChild(mealDetails);

    // Adding functionality to the meal so that on clicking opens the details page
    // meal.href = `detail.html?mealId = ${mealData.idMeal}`;
    meal.onclick = event => {
        //Function to open the link in self=_self, new page = _blank
        open(`detail.html?id=${mealData.idMeal}`, "_self");
    };

    return meal;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Favorite list by Storing in browser cache
// Writing
// localStorage["wishListKey"] = JSON.stringyfy(wishList);
//Reading
var storedData = localStorage["wishListKey"];
export const wishList = storedData ? JSON.parse(storedData) : [];

// Adding and removing of fav
export const addFavBtn = `Add to Favourite
                    <i class="fa fa-heart-o"></i>`;
export const remFavBtn = `Favorite
                    <i class="fa fa-heart"></i>`;

export function addRemoveFav(btn, event, mealData) {
    event.stopPropagation(); // Stops propagation event from parent and thus stops the page from redirecting
    const index = wishList.findIndex(id => id === mealData.idMeal);
    if (index >= 0) {
        // If present remove from wishList and display 'Add to Favorite' button
        const ok = confirm(`Do you want to remove "${mealData.strMeal}" from Favorites.`);
        if (ok) {
            wishList.splice(index, 1);
            btn.innerHTML = addFavBtn;
        }
    } else {
        // If not present add to wishList and display 'Remove Favorite' button
        wishList.push(mealData.idMeal);
        btn.innerHTML = remFavBtn;
    }
    // Updating loacal storage
    localStorage["wishListKey"] = JSON.stringify(wishList);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Loading object
export const loadingEl = document.createElement("div");
loadingEl.classList.add("ld");
loadingEl.innerHTML = "Loading <span class='loader'></span>";

// const mealsAPIDataView = [
//     {
//         idMeal: "52785",
//         strMeal: "Dal fry",
//         strDrinkAlternate: null,
//         strCategory: "Vegetarian",
//         strArea: "Indian",
//         strInstructions:
//             "Wash and soak toor dal in approx. 3 cups of water, for at least one hours. Dal will be double in volume after soaking. Drain the water.\r\nCook dal with 2-1/2 cups water and add salt, turmeric, on medium high heat, until soft in texture (approximately 30 mins) it should be like thick soup.\r\nIn a frying pan, heat the ghee. Add cumin seeds, and mustard seeds. After the seeds crack, add bay leaves, green chili, ginger and chili powder. Stir for a few seconds.\r\nAdd tomatoes, salt and sugar stir and cook until tomatoes are tender and mushy.\r\nAdd cilantro and garam masala cook for about one minute.\r\nPour the seasoning over dal mix it well and cook for another minute.\r\nServe with Naan.",
//         strMealThumb: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
//         strTags: "Curry,Vegetarian,Cake",
//         strYoutube: "https://www.youtube.com/watch?v=J4D855Q9-jg",
//         strIngredient1: "Toor dal",
//         strIngredient2: "Water",
//         strIngredient3: "Salt",
//         strIngredient4: "Turmeric",
//         strIngredient5: "Ghee",
//         strIngredient6: "Chopped tomatoes",
//         strIngredient7: "Cumin seeds",
//         strIngredient8: "Mustard Seeds",
//         strIngredient9: "Bay Leaf",
//         strIngredient10: "Green Chili",
//         strIngredient11: "Ginger",
//         strIngredient12: "Cilantro",
//         strIngredient13: "Red Pepper",
//         strIngredient14: "Salt",
//         strIngredient15: "Sugar",
//         strIngredient16: "Garam Masala",
//         strIngredient17: "",
//         strIngredient18: "",
//         strIngredient19: "",
//         strIngredient20: "",
//         strMeasure1: "1 cup",
//         strMeasure2: "2-1/2 cups",
//         strMeasure3: "1 tsp",
//         strMeasure4: "1/4 tsp",
//         strMeasure5: "3 tbs",
//         strMeasure6: "1 cup",
//         strMeasure7: "1/2 tsp",
//         strMeasure8: "1/2 tsp",
//         strMeasure9: "2",
//         strMeasure10: "1 tbs chopped",
//         strMeasure11: "2 tsp shredded",
//         strMeasure12: "2 tbs ",
//         strMeasure13: "1/2 tsp",
//         strMeasure14: "1/2 tsp",
//         strMeasure15: "1 tsp",
//         strMeasure16: "1/4 tsp",
//         strMeasure17: "",
//         strMeasure18: "",
//         strMeasure19: "",
//         strMeasure20: "",
//         strSource: "https://www.instagram.com/p/BO21bpYD3Fu",
//         strImageSource: null,
//         strCreativeCommonsConfirmed: null,
//         dateModified: null,
//     },
// ];
